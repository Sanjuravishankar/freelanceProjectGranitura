"use client";
import { useState, useCallback } from "react";

// ── Constants ─────────────────────────────────────────────
const FREE_DOMAINS = [
  "gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com",
  "aol.com","mail.com","protonmail.com","yandex.com","zoho.com",
  "live.com","msn.com","me.com","inbox.com","gmx.com","rediffmail.com",
  "qq.com","163.com","126.com","sina.com","hotmail.co.uk","yahoo.co.uk",
  "yahoo.in","yahoo.co.in","gmail.co.in","rocketmail.com","fastmail.com",
];

const GRANITE_TYPES = [
  "Black Galaxy","Absolute Black","Black Pearl","Blue Pearl","Kashmir White",
  "Colonial White","Steel Grey","Tan Brown","Indian Aurora","Vizag Blue",
  "P White","Coral Gold","Multicolour Red","Crystal Yellow","Imperial White",
  "Vizag Blue Premium","Custom / Other",
];

const FINISH_TYPES = ["Polished","Honed","Flamed","Brushed","Leathered","Sandblasted","Custom"];
const THICKNESS_OPTIONS = ["12mm","16mm","18mm","20mm","30mm","40mm","Custom"];
const DESTINATIONS = ["United States (USA)","United Kingdom (UK)","United Arab Emirates (UAE)","Saudi Arabia (KSA)","Other"];
const INCOTERMS = ["FOB","CIF","CFR","EXW","DAP","DDP"];
const CONTAINER_TYPES = ["20ft Standard","40ft Standard","40ft High Cube","LCL / Groupage","Air Freight","Custom Arrangement"];
const CERTIFICATIONS = ["ISO 9001","CE Marking","ASTM Standards","EN Standards","BIS","None Required"];

// ── Email Validator ───────────────────────────────────────
function validateCorporateEmail(email) {
  if (!email) return { valid: false, msg: "Email is required." };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { valid: false, msg: "Enter a valid email address." };
  const domain = email.split("@")[1]?.toLowerCase();
  if (FREE_DOMAINS.includes(domain)) {
    return { valid: false, msg: "Personal email addresses are not accepted. Please use your official company email." };
  }
  return { valid: true, msg: "Corporate email verified." };
}

// ── Section Header Component ──────────────────────────────
function SectionHeader({ step, title, subtitle }) {
  return (
    <div style={s.sectionHeader}>
      <div style={s.sectionMeta}>
        <span style={s.stepBadge}>{step}</span>
        <div style={s.sectionLines}>
          <span style={s.sectionTitle}>{title}</span>
          {subtitle && <span style={s.sectionSubtitle}>{subtitle}</span>}
        </div>
      </div>
      <div style={s.sectionRule} />
    </div>
  );
}

// ── Field Wrapper ─────────────────────────────────────────
function Field({ label, required, hint, error, children, half, span2 }) {
  return (
    <div style={{ ...s.field, ...(half ? s.fieldHalf : {}), ...(span2 ? s.fieldSpan2 : {}) }}>
      <label style={s.label}>
        {label}
        {required && <span style={s.required}> *</span>}
        {hint && <span style={s.hint}> — {hint}</span>}
      </label>
      {children}
      {error && <span style={s.errorMsg}>{error}</span>}
    </div>
  );
}

// ── Input ─────────────────────────────────────────────────
function Input({ value, onChange, placeholder, type = "text", success, error, ...rest }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        ...s.input,
        ...(error ? s.inputError : {}),
        ...(success ? s.inputSuccess : {}),
      }}
      {...rest}
    />
  );
}

// ── Select ────────────────────────────────────────────────
function Select({ value, onChange, options, placeholder }) {
  return (
    <div style={s.selectWrap}>
      <select value={value} onChange={onChange} style={{ ...s.input, ...s.select }}>
        <option value="">{placeholder || "Select…"}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <span style={s.selectArrow}>▾</span>
    </div>
  );
}

// ── Checkbox ──────────────────────────────────────────────
function CheckGroup({ options, selected, onChange }) {
  const toggle = (opt) => {
    const next = selected.includes(opt)
      ? selected.filter(x => x !== opt)
      : [...selected, opt];
    onChange(next);
  };
  return (
    <div style={s.checkGrid}>
      {options.map(opt => (
        <label key={opt} style={{ ...s.checkLabel, ...(selected.includes(opt) ? s.checkLabelActive : {}) }}>
          <span style={{ ...s.checkbox, ...(selected.includes(opt) ? s.checkboxActive : {}) }}>
            {selected.includes(opt) && "✓"}
          </span>
          {opt}
        </label>
      ))}
    </div>
  );
}

// ── Success Screen ────────────────────────────────────────
function SuccessScreen({ refNum }) {
  return (
    <div style={s.successWrap}>
      <div style={s.successIcon}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="23" stroke="#d4bc8a" strokeWidth="1.5" />
          <path d="M14 24l7 7 13-14" stroke="#d4bc8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 style={s.successTitle}>Enquiry Submitted</h3>
      <p style={s.successText}>
        Your export enquiry has been received. Our international trade team will review
        your requirements and respond to your registered corporate email within
        <strong style={{ color: "#d4bc8a" }}> 24–48 business hours.</strong>
      </p>
      <div style={s.successRef}>
        <span style={s.successRefLabel}>Reference Number</span>
        <span style={s.successRefNum}>{refNum}</span>
      </div>
      <p style={s.successNote}>
        Please quote this reference in all follow-up communications.
      </p>
    </div>
  );
}

// ── Main Form ─────────────────────────────────────────────
export default function ExportEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [refNum] = useState(() => "GRN-" + Date.now().toString(36).toUpperCase());
  const [errors, setErrors] = useState({});
  const [emailStatus, setEmailStatus] = useState(null); // null | 'valid' | 'invalid'

  const [form, setForm] = useState({
    // Company Identity
    companyName: "",
    registrationNo: "",
    companyType: "",
    yearEstablished: "",
    website: "",
    taxId: "",

    // Primary Contact
    contactName: "",
    designation: "",
    department: "",
    email: "",
    phone: "",
    whatsapp: "",

    // Company Address
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",

    // Export Destination & Logistics
    destination: "",
    portOfDischarge: "",
    incoterm: "",
    containerType: "",
    preferredShippingDate: "",
    frequencyOfOrder: "",

    // Product Requirements
    graniteTypes: [],
    finishTypes: [],
    thickness: "",
    customThickness: "",
    // Custom Size
    sizeL: "",
    sizeW: "",
    sizeUnit: "mm",
    customSizeNotes: "",

    // Volume & Quantity
    estimatedQuantity: "",
    quantityUnit: "sq.ft",
    orderFrequency: "",
    annualVolume: "",

    // Quality & Compliance
    certifications: [],
    qualityGrade: "",
    packagingRequirement: "",

    // Commercial
    currency: "USD",
    paymentTerms: "",
    creditReference: "",
    tradeReferences: "",

    // Additional
    projectDescription: "",
    specialRequirements: "",
    howDidYouHear: "",
    agreeToTerms: false,
    agreeToVerification: false,
  });

  const set = useCallback((key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors(prev => { const e = { ...prev }; delete e[key]; return e; });
  }, [errors]);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    set("email", val);
    if (val.length > 5) {
      const result = validateCorporateEmail(val);
      setEmailStatus(result.valid ? "valid" : "invalid");
      if (!result.valid) setErrors(prev => ({ ...prev, email: result.msg }));
      else setErrors(prev => { const e = { ...prev }; delete e.email; return e; });
    } else {
      setEmailStatus(null);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.companyName.trim()) e.companyName = "Company name is required.";
    if (!form.registrationNo.trim()) e.registrationNo = "Registration number is required.";
    if (!form.companyType) e.companyType = "Select company type.";
    if (!form.contactName.trim()) e.contactName = "Contact name is required.";
    if (!form.designation.trim()) e.designation = "Designation is required.";
    const emailV = validateCorporateEmail(form.email);
    if (!emailV.valid) e.email = emailV.msg;
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (!form.country.trim()) e.country = "Country is required.";
    if (!form.destination) e.destination = "Select export destination.";
    if (!form.incoterm) e.incoterm = "Select Incoterm.";
    if (form.graniteTypes.length === 0) e.graniteTypes = "Select at least one granite type.";
    if (!form.estimatedQuantity.trim()) e.estimatedQuantity = "Quantity is required.";
    if (!form.paymentTerms.trim()) e.paymentTerms = "Payment terms are required.";
    if (!form.agreeToTerms) e.agreeToTerms = "You must agree to the terms.";
    if (!form.agreeToVerification) e.agreeToVerification = "You must consent to company verification.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      const firstKey = Object.keys(e)[0];
      document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={s.page}>
      <div style={s.glowA} /><div style={s.glowB} />
      <div style={s.formCard}><SuccessScreen refNum={refNum} /></div>
    </div>
  );

  return (
    <div style={s.page}>
      <div style={s.glowA} />
      <div style={s.glowB} />

      <div style={s.formCard}>
        {/* ── Page Header ── */}
        <div style={s.pageHeader}>
          <div style={s.logoRow}>
            <div style={s.logoMark}>G</div>
            <div>
              <div style={s.logoName}>GRANITURA</div>
              <div style={s.logoSub}>Export Division</div>
            </div>
          </div>
          <div style={s.pageHeaderText}>
            <div style={s.eyebrowRow}>
              <div style={s.eyeLine} />
              <span style={s.eyebrow}>International Trade Enquiry</span>
              <div style={s.eyeLine} />
            </div>
            <h1 style={s.pageTitle}>Export Enquiry Form</h1>
            <p style={s.pageDesc}>
              Complete all sections accurately. We accept enquiries from registered businesses only.
              Personal email addresses will not be processed.
            </p>
          </div>
          <div style={s.headerBadges}>
            <span style={s.badge}>🔒 Verified B2B Only</span>
            <span style={s.badge}>✦ ISO 9001 Certified</span>
            <span style={s.badge}>🌍 4 Export Markets</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            SECTION 1 — COMPANY IDENTITY
        ══════════════════════════════════════════════ */}
        <SectionHeader step="01" title="Company Identity" subtitle="Legal registration details for verification" />

        <div style={s.grid}>
          <Field label="Registered Company Name" required error={errors.companyName} span2>
            <div id="field-companyName">
              <Input value={form.companyName} onChange={e => set("companyName", e.target.value)}
                placeholder="e.g. Skyline Construction LLC" error={errors.companyName} />
            </div>
          </Field>

          <Field label="Company Registration Number" required error={errors.registrationNo} hint="as on official document">
            <div id="field-registrationNo">
              <Input value={form.registrationNo} onChange={e => set("registrationNo", e.target.value)}
                placeholder="e.g. LLC-4829201" error={errors.registrationNo} />
            </div>
          </Field>

          <Field label="Company Type" required error={errors.companyType}>
            <div id="field-companyType">
              <Select value={form.companyType} onChange={e => set("companyType", e.target.value)}
                options={["Private Limited","Public Limited","LLC","Partnership","Sole Proprietorship","Government Entity","NGO / Non-profit"]}
                placeholder="Select type…" />
            </div>
          </Field>

          <Field label="Tax / VAT / GST Number" hint="optional but recommended">
            <Input value={form.taxId} onChange={e => set("taxId", e.target.value)}
              placeholder="e.g. AE123456789" />
          </Field>

          <Field label="Year Established">
            <Input value={form.yearEstablished} onChange={e => set("yearEstablished", e.target.value)}
              placeholder="e.g. 2008" type="number" />
          </Field>

          <Field label="Company Website">
            <Input value={form.website} onChange={e => set("website", e.target.value)}
              placeholder="https://yourcompany.com" type="url" />
          </Field>
        </div>

        {/* ══════════════════════════════════════════════
            SECTION 2 — PRIMARY CONTACT
        ══════════════════════════════════════════════ */}
        <SectionHeader step="02" title="Primary Contact" subtitle="Authorised representative details" />

        <div style={s.grid}>
          <Field label="Full Name" required error={errors.contactName}>
            <div id="field-contactName">
              <Input value={form.contactName} onChange={e => set("contactName", e.target.value)}
                placeholder="e.g. James Mitchell" error={errors.contactName} />
            </div>
          </Field>

          <Field label="Designation / Title" required error={errors.designation}>
            <div id="field-designation">
              <Input value={form.designation} onChange={e => set("designation", e.target.value)}
                placeholder="e.g. Procurement Director" error={errors.designation} />
            </div>
          </Field>

          <Field label="Department">
            <Select value={form.department} onChange={e => set("department", e.target.value)}
              options={["Procurement","Supply Chain","Operations","Project Management","Finance","Executive / C-Suite","Other"]}
              placeholder="Select department…" />
          </Field>

          <Field label="Corporate Email Address" required error={errors.email}
            hint="no personal emails accepted">
            <div id="field-email" style={{ position: "relative" }}>
              <Input
                value={form.email}
                onChange={handleEmailChange}
                placeholder="you@yourcompany.com"
                type="email"
                error={errors.email}
                success={emailStatus === "valid"}
              />
              {emailStatus === "valid" && (
                <span style={s.emailValid}>✓ Corporate email verified</span>
              )}
              {emailStatus === "invalid" && !errors.email && (
                <span style={s.emailInvalid}>✗ Personal email not accepted</span>
              )}
            </div>
            <p style={s.emailNote}>
              ⚠ Only official company domain email addresses are accepted (e.g. name@company.com).
              Enquiries from Gmail, Yahoo, Outlook, Hotmail and similar personal services will not be processed.
            </p>
          </Field>

          <Field label="Phone Number" required error={errors.phone} hint="include country code">
            <div id="field-phone">
              <Input value={form.phone} onChange={e => set("phone", e.target.value)}
                placeholder="+1 555 000 0000" type="tel" error={errors.phone} />
            </div>
          </Field>

          <Field label="WhatsApp Number" hint="for faster coordination">
            <Input value={form.whatsapp} onChange={e => set("whatsapp", e.target.value)}
              placeholder="+971 50 000 0000" type="tel" />
          </Field>
        </div>

        {/* ══════════════════════════════════════════════
            SECTION 3 — COMPANY ADDRESS
        ══════════════════════════════════════════════ */}
        <SectionHeader step="03" title="Company Address" subtitle="Registered office or principal place of business" />

        <div style={s.grid}>
          <Field label="Address Line 1" span2>
            <Input value={form.addressLine1} onChange={e => set("addressLine1", e.target.value)}
              placeholder="Street, Building, Unit number" />
          </Field>

          <Field label="Address Line 2" span2>
            <Input value={form.addressLine2} onChange={e => set("addressLine2", e.target.value)}
              placeholder="District, Area, PO Box (optional)" />
          </Field>

          <Field label="City">
            <Input value={form.city} onChange={e => set("city", e.target.value)} placeholder="e.g. Dubai" />
          </Field>

          <Field label="State / Province">
            <Input value={form.state} onChange={e => set("state", e.target.value)} placeholder="e.g. Dubai Emirate" />
          </Field>

          <Field label="Country" required error={errors.country}>
            <div id="field-country">
              <Input value={form.country} onChange={e => set("country", e.target.value)}
                placeholder="e.g. United Arab Emirates" error={errors.country} />
            </div>
          </Field>

          <Field label="Postal / ZIP Code">
            <Input value={form.postalCode} onChange={e => set("postalCode", e.target.value)}
              placeholder="e.g. 12345" />
          </Field>
        </div>

        {/* ══════════════════════════════════════════════
            SECTION 4 — EXPORT DESTINATION & LOGISTICS
        ══════════════════════════════════════════════ */}
        <SectionHeader step="04" title="Export Destination & Logistics" subtitle="Shipping preferences and trade terms" />

        <div style={s.grid}>
          <Field label="Export Destination" required error={errors.destination}>
            <div id="field-destination">
              <Select value={form.destination} onChange={e => set("destination", e.target.value)}
                options={DESTINATIONS} />
            </div>
          </Field>

          <Field label="Port of Discharge" hint="nearest sea/air port">
            <Input value={form.portOfDischarge} onChange={e => set("portOfDischarge", e.target.value)}
              placeholder="e.g. Jebel Ali Port, Dubai" />
          </Field>

          <Field label="Preferred Incoterm" required error={errors.incoterm}>
            <div id="field-incoterm">
              <Select value={form.incoterm} onChange={e => set("incoterm", e.target.value)}
                options={INCOTERMS} />
            </div>
          </Field>

          <Field label="Container / Freight Type">
            <Select value={form.containerType} onChange={e => set("containerType", e.target.value)}
              options={CONTAINER_TYPES} />
          </Field>

          <Field label="Preferred First Shipment Date">
            <Input value={form.preferredShippingDate} onChange={e => set("preferredShippingDate", e.target.value)}
              type="date" />
          </Field>

          <Field label="Order Frequency">
            <Select value={form.frequencyOfOrder} onChange={e => set("frequencyOfOrder", e.target.value)}
              options={["One-time / Trial Order","Monthly","Quarterly","Bi-Annual","Annual","As Required"]}
              placeholder="Select frequency…" />
          </Field>
        </div>

        {/* ══════════════════════════════════════════════
            SECTION 5 — PRODUCT REQUIREMENTS
        ══════════════════════════════════════════════ */}
        <SectionHeader step="05" title="Product Requirements" subtitle="Granite specifications and custom dimensions" />

        <div style={s.gridFull}>
          <Field label="Granite Type(s) Required" required error={errors.graniteTypes}>
            <div id="field-graniteTypes">
              <CheckGroup options={GRANITE_TYPES} selected={form.graniteTypes}
                onChange={v => set("graniteTypes", v)} />
              {errors.graniteTypes && <span style={s.errorMsg}>{errors.graniteTypes}</span>}
            </div>
          </Field>
        </div>

        <div style={s.gridFull}>
          <Field label="Surface Finish Required">
            <CheckGroup options={FINISH_TYPES} selected={form.finishTypes}
              onChange={v => set("finishTypes", v)} />
          </Field>
        </div>

        <div style={s.grid}>
          <Field label="Standard Thickness" hint="select or specify custom below">
            <Select value={form.thickness} onChange={e => set("thickness", e.target.value)}
              options={THICKNESS_OPTIONS} placeholder="Select thickness…" />
          </Field>

          {form.thickness === "Custom" && (
            <Field label="Custom Thickness (mm)" hint="specify exact value">
              <Input value={form.customThickness} onChange={e => set("customThickness", e.target.value)}
                placeholder="e.g. 25mm" />
            </Field>
          )}
        </div>

        {/* Custom Size Block */}
        <div style={s.customSizeBlock}>
          <div style={s.customSizeHeader}>
            <span style={s.customSizeIcon}>⊹</span>
            <span style={s.customSizeTitle}>Custom Size Requirements</span>
          </div>
          <div style={s.grid}>
            <Field label="Length" hint="enter value">
              <div style={s.sizeInputRow}>
                <Input value={form.sizeL} onChange={e => set("sizeL", e.target.value)}
                  placeholder="e.g. 2400" type="number" />
                <div style={s.selectWrap}>
                  <select value={form.sizeUnit} onChange={e => set("sizeUnit", e.target.value)}
                    style={{ ...s.input, ...s.select, width: "90px", paddingRight: "28px" }}>
                    {["mm","cm","inch","ft"].map(u => <option key={u}>{u}</option>)}
                  </select>
                  <span style={s.selectArrow}>▾</span>
                </div>
              </div>
            </Field>

            <Field label="Width" hint="enter value">
              <div style={s.sizeInputRow}>
                <Input value={form.sizeW} onChange={e => set("sizeW", e.target.value)}
                  placeholder="e.g. 1200" type="number" />
                <span style={s.sizeUnitLabel}>{form.sizeUnit}</span>
              </div>
            </Field>

            <Field label="Detailed Size & Cut Notes" span2
              hint="describe any edge profile, cut shape, tolerance, or pattern requirements">
              <textarea
                value={form.customSizeNotes}
                onChange={e => set("customSizeNotes", e.target.value)}
                placeholder="e.g. Mitred edges on long sides, radius corners R=50mm, bookmatched pairs, ±1mm tolerance. Include any special patterns, veining direction, or installation requirements…"
                rows={4}
                style={s.textarea}
              />
            </Field>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            SECTION 6 — VOLUME & QUANTITY
        ══════════════════════════════════════════════ */}
        <SectionHeader step="06" title="Volume & Quantity" subtitle="Estimated order and annual requirements" />

        <div style={s.grid}>
          <Field label="Estimated Order Quantity" required error={errors.estimatedQuantity}>
            <div id="field-estimatedQuantity" style={s.sizeInputRow}>
              <Input value={form.estimatedQuantity}
                onChange={e => set("estimatedQuantity", e.target.value)}
                placeholder="e.g. 500" type="number" error={errors.estimatedQuantity} />
              <div style={s.selectWrap}>
                <select value={form.quantityUnit} onChange={e => set("quantityUnit", e.target.value)}
                  style={{ ...s.input, ...s.select, width: "110px", paddingRight: "28px" }}>
                  {["sq.ft","sq.m","slabs","containers","tons"].map(u => <option key={u}>{u}</option>)}
                </select>
                <span style={s.selectArrow}>▾</span>
              </div>
            </div>
          </Field>

          <Field label="Estimated Annual Volume" hint="full year forecast">
            <Input value={form.annualVolume} onChange={e => set("annualVolume", e.target.value)}
              placeholder="e.g. 5,000 sq.ft / year" />
          </Field>
        </div>

        {/* ══════════════════════════════════════════════
            SECTION 7 — QUALITY & COMPLIANCE
        ══════════════════════════════════════════════ */}
        <SectionHeader step="07" title="Quality & Compliance" subtitle="Standards and packaging preferences" />

        <div style={s.gridFull}>
          <Field label="Required Certifications / Standards">
            <CheckGroup options={CERTIFICATIONS} selected={form.certifications}
              onChange={v => set("certifications", v)} />
          </Field>
        </div>

        <div style={s.grid}>
          <Field label="Quality Grade Required">
            <Select value={form.qualityGrade} onChange={e => set("qualityGrade", e.target.value)}
              options={["Premium First Choice (A Grade)","Commercial Grade (B Grade)","Economy Grade","Mixed Grade","As Per Sample"]}
              placeholder="Select grade…" />
          </Field>

          <Field label="Packaging Requirement">
            <Select value={form.packagingRequirement} onChange={e => set("packagingRequirement", e.target.value)}
              options={["Wooden Crates (Standard)","Wooden Crates (Fumigated / ISPM-15)","Pallets","Sea-worthy Packing","As Per Buyer Spec","No Preference"]}
              placeholder="Select packaging…" />
          </Field>
        </div>

        {/* ══════════════════════════════════════════════
            SECTION 8 — COMMERCIAL TERMS
        ══════════════════════════════════════════════ */}
        <SectionHeader step="08" title="Commercial Terms" subtitle="Financial and trade reference information" />

        <div style={s.grid}>
          <Field label="Preferred Currency">
            <Select value={form.currency} onChange={e => set("currency", e.target.value)}
              options={["USD","EUR","GBP","AED","SAR","INR","SGD"]}
              placeholder="Select currency…" />
          </Field>

          <Field label="Preferred Payment Terms" required error={errors.paymentTerms}>
            <div id="field-paymentTerms">
              <Select value={form.paymentTerms} onChange={e => set("paymentTerms", e.target.value)}
                options={["100% Advance","50% Advance, 50% on BL","LC at Sight","LC 30/60/90 Days","DA / DP Terms","Open Account (existing customers only)"]}
                placeholder="Select terms…" />
              {errors.paymentTerms && <span style={s.errorMsg}>{errors.paymentTerms}</span>}
            </div>
          </Field>

          <Field label="Bank / Credit Reference" hint="optional, speeds up verification">
            <Input value={form.creditReference} onChange={e => set("creditReference", e.target.value)}
              placeholder="e.g. Bank name, account manager contact" />
          </Field>

          <Field label="Trade References" hint="existing stone / materials suppliers">
            <Input value={form.tradeReferences} onChange={e => set("tradeReferences", e.target.value)}
              placeholder="e.g. Company names or contact details" />
          </Field>
        </div>

        {/* ══════════════════════════════════════════════
            SECTION 9 — PROJECT & ADDITIONAL DETAILS
        ══════════════════════════════════════════════ */}
        <SectionHeader step="09" title="Project & Additional Details" subtitle="Help us understand your use case" />

        <div style={s.gridFull}>
          <Field label="Project / Application Description"
            hint="describe the project these materials are for">
            <textarea
              value={form.projectDescription}
              onChange={e => set("projectDescription", e.target.value)}
              placeholder="e.g. Luxury residential tower in Dubai Marina — supplying lobby flooring, lift cladding, and bathroom countertops across 42 floors. Architect specifications attached separately…"
              rows={4}
              style={s.textarea}
            />
          </Field>
        </div>

        <div style={s.gridFull}>
          <Field label="Special Requirements or Additional Notes">
            <textarea
              value={form.specialRequirements}
              onChange={e => set("specialRequirements", e.target.value)}
              placeholder="Any other technical, logistical, or commercial requirements not covered above…"
              rows={3}
              style={s.textarea}
            />
          </Field>
        </div>

        <div style={s.grid}>
          <Field label="How Did You Hear About Granitura?">
            <Select value={form.howDidYouHear} onChange={e => set("howDidYouHear", e.target.value)}
              options={["Trade Exhibition / Fair","Industry Referral","Online Search","LinkedIn","Our Website","Export Directory","Existing Customer Referral","Government Trade Portal","Other"]}
              placeholder="Select source…" />
          </Field>
        </div>

        {/* ══════════════════════════════════════════════
            DECLARATIONS
        ══════════════════════════════════════════════ */}
        <div style={s.declarationsBlock}>
          <div style={s.declarationsTitle}>Declarations & Consent</div>

          <label id="field-agreeToVerification"
            style={{ ...s.declareLabel, ...(errors.agreeToVerification ? s.declareLabelError : {}) }}>
            <span style={{ ...s.checkbox, ...(form.agreeToVerification ? s.checkboxActive : {}), flexShrink: 0 }}
              onClick={() => set("agreeToVerification", !form.agreeToVerification)}>
              {form.agreeToVerification && "✓"}
            </span>
            <span>
              I authorise Granitura Export Division to verify the company registration details,
              email domain, and trade references provided in this form before processing this enquiry.
              I confirm I am an authorised representative of the stated company.
              {errors.agreeToVerification && <span style={s.errorMsg}> — {errors.agreeToVerification}</span>}
            </span>
          </label>

          <label id="field-agreeToTerms"
            style={{ ...s.declareLabel, ...(errors.agreeToTerms ? s.declareLabelError : {}) }}>
            <span style={{ ...s.checkbox, ...(form.agreeToTerms ? s.checkboxActive : {}), flexShrink: 0 }}
              onClick={() => set("agreeToTerms", !form.agreeToTerms)}>
              {form.agreeToTerms && "✓"}
            </span>
            <span>
              I agree to Granitura's Export Enquiry Terms, confirm that all information provided
              is accurate and complete, and understand that false or misleading information may
              result in rejection of this enquiry.
              {errors.agreeToTerms && <span style={s.errorMsg}> — {errors.agreeToTerms}</span>}
            </span>
          </label>
        </div>

        {/* ── Submit ── */}
        <div style={s.submitRow}>
          <div style={s.submitNote}>
            <span style={s.lockIcon}>🔒</span>
            All data is encrypted and used solely for processing your export enquiry.
            Your corporate email will be used for all official communications.
          </div>
          <button onClick={handleSubmit} style={s.submitBtn}>
            Submit Export Enquiry
            <span style={s.submitArrow}>→</span>
          </button>
        </div>

        {/* Footer */}
        <div style={s.formFooter}>
          <span>GRANITURA EXPORT DIVISION</span>
          <span>·</span>
          <span>ISO 9001:2015 Certified</span>
          <span>·</span>
          <span>exports@granitura.com</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Design Tokens & Styles ─────────────────────────────── */
const s = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(155deg, #0f2318 0%, #1a3a2a 45%, #0d1f14 100%)",
    padding: "40px 16px 60px",
    fontFamily: "Georgia,'Times New Roman',serif",
    position: "relative",
    overflow: "hidden",
  },
  glowA: {
    position: "fixed", width: "600px", height: "600px", borderRadius: "50%",
    top: "-150px", left: "-150px", pointerEvents: "none",
    background: "radial-gradient(circle, rgba(74,138,94,0.07) 0%, transparent 70%)",
  },
  glowB: {
    position: "fixed", width: "500px", height: "500px", borderRadius: "50%",
    bottom: "-100px", right: "-100px", pointerEvents: "none",
    background: "radial-gradient(circle, rgba(184,160,112,0.05) 0%, transparent 70%)",
  },

  formCard: {
    maxWidth: "860px",
    margin: "0 auto",
    background: "linear-gradient(180deg, rgba(20,46,30,0.92) 0%, rgba(15,35,24,0.96) 100%)",
    border: "1px solid rgba(74,138,94,0.25)",
    borderRadius: "6px",
    overflow: "hidden",
    boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(184,160,112,0.06)",
    position: "relative",
    zIndex: 1,
  },

  // Page Header
  pageHeader: {
    padding: "40px 40px 32px",
    borderBottom: "1px solid rgba(74,138,94,0.2)",
    background: "linear-gradient(180deg, rgba(26,58,42,0.6) 0%, transparent 100%)",
  },
  logoRow: {
    display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px",
  },
  logoMark: {
    width: "42px", height: "42px", borderRadius: "3px",
    background: "linear-gradient(135deg, #b8a070, #d4bc8a)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "22px", fontWeight: "700", color: "#1a3a2a", letterSpacing: "-1px",
  },
  logoName: {
    fontSize: "15px", fontWeight: "700", color: "#f9faf8", letterSpacing: "4px",
    fontFamily: "Arial,sans-serif",
  },
  logoSub: {
    fontSize: "10px", color: "#b8a070", letterSpacing: "2px", fontFamily: "Arial,sans-serif",
    textTransform: "uppercase",
  },
  pageHeaderText: { marginBottom: "20px" },
  eyebrowRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" },
  eyeLine: { height: "1px", width: "32px", background: "linear-gradient(to right, transparent, #b8a070)" },
  eyebrow: {
    fontSize: "9.5px", letterSpacing: "3px", textTransform: "uppercase",
    color: "#b8a070", fontFamily: "Arial,sans-serif",
  },
  pageTitle: {
    fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: "700",
    color: "#f9faf8", margin: "0 0 10px", letterSpacing: "-0.5px",
  },
  pageDesc: {
    fontSize: "0.9rem", color: "#c8dfd1", lineHeight: "1.7",
    fontFamily: "Arial,sans-serif", fontWeight: "300", maxWidth: "560px",
  },
  headerBadges: { display: "flex", gap: "10px", flexWrap: "wrap" },
  badge: {
    fontSize: "10px", letterSpacing: "0.5px", fontFamily: "Arial,sans-serif",
    color: "#b8a070", border: "1px solid rgba(184,160,112,0.3)",
    padding: "4px 10px", borderRadius: "2px",
    background: "rgba(184,160,112,0.06)",
  },

  // Section Header
  sectionHeader: { padding: "32px 40px 0" },
  sectionMeta: { display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "12px" },
  stepBadge: {
    fontSize: "10px", fontFamily: "Arial,sans-serif", color: "#b8a070",
    border: "1px solid rgba(184,160,112,0.4)", padding: "3px 8px",
    borderRadius: "2px", letterSpacing: "1px", flexShrink: 0, marginTop: "2px",
  },
  sectionLines: { display: "flex", flexDirection: "column", gap: "2px" },
  sectionTitle: {
    fontSize: "1.05rem", fontWeight: "700", color: "#f9faf8", letterSpacing: "-0.2px",
  },
  sectionSubtitle: {
    fontSize: "11px", color: "#7a9080", fontFamily: "Arial,sans-serif", letterSpacing: "0.3px",
  },
  sectionRule: {
    height: "1px",
    background: "linear-gradient(to right, rgba(74,138,94,0.5), rgba(74,138,94,0.1), transparent)",
  },

  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "16px 20px",
    padding: "20px 40px",
  },
  gridFull: { padding: "20px 40px 0" },

  // Field
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  fieldHalf: { gridColumn: "span 1" },
  fieldSpan2: { gridColumn: "span 2" },
  label: {
    fontSize: "11px", fontFamily: "Arial,sans-serif", letterSpacing: "0.5px",
    color: "#c8dfd1", textTransform: "uppercase", fontWeight: "600",
  },
  required: { color: "#d4bc8a" },
  hint: { color: "#4a6a54", fontWeight: "400", textTransform: "none", letterSpacing: "0" },
  errorMsg: {
    fontSize: "11px", color: "#e8a090", fontFamily: "Arial,sans-serif",
    display: "block", marginTop: "2px",
  },

  // Input
  input: {
    width: "100%", padding: "10px 14px",
    background: "rgba(10,28,18,0.7)",
    border: "1px solid rgba(74,138,94,0.3)",
    borderRadius: "3px",
    color: "#f9faf8",
    fontSize: "13.5px",
    fontFamily: "Arial,sans-serif",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
  },
  inputError: {
    borderColor: "rgba(232,160,144,0.6)",
    boxShadow: "0 0 0 2px rgba(232,160,144,0.1)",
  },
  inputSuccess: {
    borderColor: "rgba(74,138,94,0.8)",
    boxShadow: "0 0 0 2px rgba(74,138,94,0.1)",
  },

  // Select
  selectWrap: { position: "relative", display: "flex", alignItems: "center" },
  select: { paddingRight: "32px", cursor: "pointer" },
  selectArrow: {
    position: "absolute", right: "10px", color: "#7a9080",
    fontSize: "11px", pointerEvents: "none",
  },

  // Textarea
  textarea: {
    width: "100%", padding: "12px 14px",
    background: "rgba(10,28,18,0.7)",
    border: "1px solid rgba(74,138,94,0.3)",
    borderRadius: "3px",
    color: "#f9faf8",
    fontSize: "13px",
    fontFamily: "Arial,sans-serif",
    outline: "none",
    resize: "vertical",
    lineHeight: "1.65",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },

  // Email status
  emailValid: {
    display: "block", fontSize: "11px", color: "#4a8a5e",
    fontFamily: "Arial,sans-serif", marginTop: "4px",
  },
  emailInvalid: {
    display: "block", fontSize: "11px", color: "#e8a090",
    fontFamily: "Arial,sans-serif", marginTop: "4px",
  },
  emailNote: {
    fontSize: "10.5px", color: "#4a6a54", fontFamily: "Arial,sans-serif",
    lineHeight: "1.55", margin: "4px 0 0", borderLeft: "2px solid rgba(184,160,112,0.3)",
    paddingLeft: "8px",
  },

  // Checkbox group
  checkGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(185px,1fr))",
    gap: "8px",
  },
  checkLabel: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "8px 12px",
    border: "1px solid rgba(74,138,94,0.2)",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "12px", fontFamily: "Arial,sans-serif", color: "#c8dfd1",
    transition: "border-color 0.2s, background 0.2s",
    background: "rgba(10,28,18,0.4)",
    userSelect: "none",
  },
  checkLabelActive: {
    borderColor: "rgba(184,160,112,0.6)",
    background: "rgba(184,160,112,0.08)",
    color: "#d4bc8a",
  },
  checkbox: {
    width: "16px", height: "16px", borderRadius: "2px",
    border: "1px solid rgba(74,138,94,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "10px", color: "#d4bc8a", flexShrink: 0,
    background: "rgba(10,28,18,0.6)",
    transition: "border-color 0.2s, background 0.2s",
  },
  checkboxActive: {
    borderColor: "#d4bc8a",
    background: "rgba(184,160,112,0.15)",
  },

  // Custom Size Block
  customSizeBlock: {
    margin: "4px 40px 8px",
    border: "1px solid rgba(184,160,112,0.2)",
    borderRadius: "4px",
    background: "rgba(184,160,112,0.03)",
    padding: "16px 0 4px",
  },
  customSizeHeader: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "0 20px 12px",
    borderBottom: "1px solid rgba(74,138,94,0.15)",
    marginBottom: "4px",
  },
  customSizeIcon: { color: "#b8a070", fontSize: "16px" },
  customSizeTitle: {
    fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase",
    color: "#b8a070", fontFamily: "Arial,sans-serif", fontWeight: "600",
  },

  // Size input inline
  sizeInputRow: { display: "flex", gap: "8px", alignItems: "center" },
  sizeUnitLabel: {
    fontSize: "12px", color: "#7a9080", fontFamily: "Arial,sans-serif",
    padding: "10px 10px", border: "1px solid rgba(74,138,94,0.2)",
    borderRadius: "3px", background: "rgba(10,28,18,0.5)", whiteSpace: "nowrap",
  },

  // Declarations
  declarationsBlock: {
    margin: "24px 40px",
    border: "1px solid rgba(184,160,112,0.2)",
    borderRadius: "4px",
    padding: "20px 20px",
    background: "rgba(10,28,18,0.4)",
  },
  declarationsTitle: {
    fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase",
    color: "#b8a070", fontFamily: "Arial,sans-serif", fontWeight: "600",
    marginBottom: "16px",
  },
  declareLabel: {
    display: "flex", gap: "12px", alignItems: "flex-start", cursor: "pointer",
    fontSize: "12px", fontFamily: "Arial,sans-serif", color: "#c8dfd1",
    lineHeight: "1.65", marginBottom: "14px", userSelect: "none",
  },
  declareLabelError: { color: "#e8c8c0" },

  // Submit
  submitRow: {
    padding: "0 40px 32px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    flexWrap: "wrap", gap: "16px",
  },
  submitNote: {
    fontSize: "11px", color: "#4a6a54", fontFamily: "Arial,sans-serif",
    lineHeight: "1.6", maxWidth: "380px", display: "flex", gap: "6px",
  },
  lockIcon: { fontSize: "13px", flexShrink: 0 },
  submitBtn: {
    display: "inline-flex", alignItems: "center", gap: "12px",
    background: "linear-gradient(135deg, #a8904a 0%, #d4bc8a 50%, #a8904a 100%)",
    color: "#1a3a2a", padding: "14px 36px", fontSize: "12px",
    fontFamily: "Arial,sans-serif", fontWeight: "700", letterSpacing: "2px",
    textTransform: "uppercase", border: "none", borderRadius: "2px", cursor: "pointer",
    boxShadow: "0 4px 24px rgba(184,160,112,0.25)",
    transition: "opacity 0.2s, transform 0.15s",
  },
  submitArrow: { fontSize: "16px" },

  // Footer
  formFooter: {
    padding: "16px 40px",
    borderTop: "1px solid rgba(74,138,94,0.15)",
    display: "flex", gap: "10px", justifyContent: "center",
    fontSize: "9.5px", color: "#4a6a54", fontFamily: "Arial,sans-serif",
    letterSpacing: "1px", flexWrap: "wrap",
  },

  // Success
  successWrap: {
    padding: "80px 48px",
    display: "flex", flexDirection: "column", alignItems: "center",
    textAlign: "center",
  },
  successIcon: { marginBottom: "24px" },
  successTitle: {
    fontSize: "1.8rem", fontWeight: "700", color: "#f9faf8",
    marginBottom: "16px", letterSpacing: "-0.5px",
  },
  successText: {
    fontSize: "0.95rem", color: "#c8dfd1", lineHeight: "1.75",
    fontFamily: "Arial,sans-serif", maxWidth: "460px", marginBottom: "28px",
  },
  successRef: {
    border: "1px solid rgba(184,160,112,0.3)",
    borderRadius: "4px", padding: "16px 32px",
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: "4px", background: "rgba(184,160,112,0.05)", marginBottom: "16px",
  },
  successRefLabel: {
    fontSize: "9px", letterSpacing: "2px", color: "#7a9080",
    fontFamily: "Arial,sans-serif", textTransform: "uppercase",
  },
  successRefNum: {
    fontSize: "1.3rem", color: "#d4bc8a", fontWeight: "700", letterSpacing: "2px",
  },
  successNote: {
    fontSize: "11px", color: "#4a6a54", fontFamily: "Arial,sans-serif",
  },
};