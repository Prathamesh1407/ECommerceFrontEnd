import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div style={styles.privacyPolicy}>
        <h2 style={styles.heading}>Privacy Policy</h2>
        <p style={styles.paragraph}>
          This privacy policy describes how MarketEase
          collects, uses, and shares personal data when you use our
          website.
        </p>
        <h3 style={styles.subHeading}>Information Collection</h3>
        <p style={styles.paragraph}>
          We collect information you provide directly to us, such as when you
          create an account, make a purchase, or contact us for support. This
          information may include your name, email address, shipping address,
          payment information, and any other information you choose to provide.
        </p>
        <h3 style={styles.subHeading}>Information Usage</h3>
        <p style={styles.paragraph}>
          We may use the information we collect to:
          <ul style={styles.list}>
            <li>Process and fulfill orders</li>
            <li>Communicate with you about your orders and account</li>
            <li>Respond to your inquiries and provide support</li>
            <li>Improve and personalize our services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </p>
        <h3 style={styles.subHeading}>Information Sharing</h3>
        <p style={styles.paragraph}>
          We may share your information with third-party service providers who
          perform services on our behalf, such as payment processing, order
          fulfillment, and data analysis. We may also share information in
          response to legal requests or to protect our rights and interests.
        </p>
        <h3 style={styles.subHeading}>Data Security</h3>
        <p style={styles.paragraph}>
          We take reasonable measures to protect your information from
          unauthorized access and use. However, no data transmission over the
          internet or method of storage is completely secure, so we cannot
          guarantee absolute security.
        </p>
        <h3 style={styles.subHeading}>Changes to this Policy</h3>
        <p style={styles.paragraph}>
          We may update this policy from time to time. Any changes will be
          posted on this page, so please review it periodically. Your continued
          use of the Site after any changes indicates your acceptance of the
          updated policy.
        </p>
        <h3 style={styles.subHeading}>Contact Us</h3>
        <p style={styles.paragraph}>
          If you have any questions or concerns about this policy, please
          contact us at [MarketEase@gmail.com].
        </p>
      </div>
    </Layout>
  );
};

const styles = {
  privacyPolicy: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    marginTop: "0",
  },
  subHeading: {
    marginTop: "20px",
  },
  paragraph: {
    marginBottom: "20px",
  },
  list: {
    listStyleType: "disc",
    marginLeft: "20px",
  },
};

export default Policy;
