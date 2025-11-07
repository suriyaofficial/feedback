# 📝 Feedback Platform

A feedback collection and review redirection web app hosted at **[feedback.web.app](https://feedback.web.app)**.

---

## 🌐 Main Pages

### **Public**
- **Homepage:** [`feedback.web.app`](https://feedback.web.app)  
  → Product overview and introduction video.

---

### **Admin**
- **Login & Register:** [`feedback.web.app/admin`](https://feedback.web.app/admin)

- **Dashboard:** [`feedback.web.app/admin/dashboard`](https://feedback.web.app/admin/dashboard)  
  → Create or view your business listings.

- **Create Business:** [`feedback.web.app/admin/create`](https://feedback.web.app/admin/create)
  - **Fields:**
    - Business Name  
    - Tagline  
    - Custom Slider Design  
    - Place ID *(with info button explaining how to find it)*  
    - Email (optional) — for alert notifications on low ratings  
    - Warning Rating Threshold  
  - **Features:**
    - Verify email ID for alerts  
    - Generate QR code for business feedback  

- **View Business:** [`feedback.web.app/admin/view/{businessName}/{placeId}`](https://feedback.web.app/admin/view/bussniessname/PlaceId)  
  - View generated QR / feedback link  
  - List of reviews with sorting options  

---

### **Customer Feedback Page**
- **URL:** [`feedback.web.app/{businessName}/{placeId}`](https://feedback.web.app/bussniessname/PlaceId)

#### Fields:
- Email  
- Phone Number  
- Activity Type:
  - DSD  
  - Course  
  - Fun Dive  

#### Optional Questions:
- Interested in OWC (Open Water Course)?  
- Know swimming?  

#### Components:
- Feedback slider (for rating)
- **Next → Save Details** (with time and date)

---

## ⭐ Rating Logic

- If rating is **below warning level** →  
  Show: *“Thanks for your feedback, we will improve our service.”*

- If rating is **above warning level** →  
  Show: *“Thanks for your feedback, visit again!”*  
  → Redirects user to **Google Review** page.

---

## ⚙️ Features Summary

✅ Admin Dashboard  
✅ Business creation with QR generator  
✅ Rating-based alerts via email  
✅ Customer feedback form  
✅ Google Review redirection  
✅ Review sorting and management  

---

## 📽️ Demo Video

*(Add your product video or YouTube link here)*

---

## 🚀 Hosting

**Firebase Hosting:** [https://feedback.web.app](https://feedback.web.app)
