# SmartPOS Pro

SmartPOS Pro is a modern Point of Sale (POS) and inventory management system designed to help businesses manage products, customers, sales, invoices, inventory, reports, and user access from a single platform.

## 🚀 Features

### 🔐 Authentication & Authorization

* Secure user login and logout
* JWT-based authentication
* Admin and Cashier roles
* Role-based sidebar navigation
* Admin-only page protection
* Protected dashboard routes
* Unauthorized access handling

### 📊 Dashboard

* Total products
* Today's revenue
* Today's orders
* Low-stock products
* Sales overview
* Recent sales
* Top products
* Inventory insights

### 📦 Product Management

* Add products
* Update products
* Delete products
* View product information
* Stock management
* Low-stock monitoring

### 🏷️ Category Management

* Create categories
* Update categories
* Delete categories
* Manage product categories

### 👥 Customer Management

* Add customers
* Update customer information
* Delete customers
* View customer records

### 🚚 Supplier Management

* Add suppliers
* Update suppliers
* Delete suppliers
* Supplier management for inventory operations

### 🛒 Sales & POS

* Process sales
* Manage transactions
* Customer selection
* Payment method management
* Sales history

### 🧾 Invoice Management

* View all invoices
* Invoice number
* Customer information
* Total amount
* Payment method
* Sale status
* Transaction date
* View invoice details

### 📈 Reports

* Sales reports
* Inventory information
* Business performance data

### 🔔 Notifications

* Low-stock notifications
* Sales notifications
* Inventory update notifications
* Notification dropdown

### 🎨 UI & UX

* Modern responsive interface
* Light and dark mode
* Responsive dashboard
* Mobile-friendly layouts
* Animated UI components
* Modern cards, tables and navigation
* Clean POS-focused design

---

## 👤 User Roles

### Admin

Admin users have access to:

* Dashboard
* Products
* Categories
* Customers
* Suppliers
* Sales
* Invoices
* Reports
* Settings

### Cashier

Cashier users have access to:

* Dashboard
* Sales
* Invoices
* Customers

Cashiers cannot access admin-only sections such as:

* Products
* Categories
* Suppliers
* Reports
* Settings

---

## 🛠️ Technologies Used

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Lucide React

### Backend

* Next.js API Routes
* REST APIs
* JWT Authentication

### Database

* MongoDB
* Mongoose

### UI

* Responsive design
* Dark / Light mode
* Component-based architecture

### Development Tools

* VS Code
* Git
* GitHub
* npm

---

## 📁 Project Structure

```text
smart-pos/
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── sales/
│   │   └── notifications/
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── products/
│   │   ├── categories/
│   │   ├── customers/
│   │   ├── suppliers/
│   │   ├── sales/
│   │   ├── invoices/
│   │   ├── reports/
│   │   └── settings/
│   │
│   └── login/
│
├── components/
│   ├── dashboard/
│   │   ├── sidebar.tsx
│   │   ├── sidebar-item.tsx
│   │   ├── user-menu.tsx
│   │   ├── stats-card.tsx
│   │   ├── sales-overview.tsx
│   │   ├── recent-sales.tsx
│   │   ├── low-stock.tsx
│   │   └── top-products.tsx
│   │
│   ├── animations/
│   └── ui/
│
├── lib/
│   └── mongodb.ts
│
├── models/
│   ├── User.ts
│   ├── Product.ts
│   ├── Customer.ts
│   ├── Supplier.ts
│   ├── Sale.ts
│   └── Notification.ts
│
├── middleware.ts
│
├── .env.local
├── package.json
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project:

```bash
cd smart-pos
```

Install dependencies:

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root.

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Important

Do not commit `.env.local` or any secrets to GitHub.

Make sure `.gitignore` contains:

```gitignore
.env
.env.local
.env.production
.env.development
node_modules
.next
```

---

## ▶️ Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## 🔐 Authentication Flow

SmartPOS Pro uses JWT authentication.

The login process:

```text
Login
  ↓
Validate User
  ↓
Generate JWT
  ↓
Store Token in Cookie
  ↓
Access Dashboard
  ↓
Middleware Validates Token
  ↓
Role-Based Access
```

The middleware protects:

```text
/dashboard/*
```

Admin-only routes are protected separately.

---

## 🛡️ Role-Based Access Control

Admin-only routes:

```text
/dashboard/products
/dashboard/categories
/dashboard/suppliers
/dashboard/reports
/dashboard/settings
```

Cashier-accessible routes:

```text
/dashboard
/dashboard/sales
/dashboard/invoices
/dashboard/customers
```

Roles are normalized before comparison so values such as:

```text
Admin
ADMIN
admin
```

can be handled consistently.

---

## 🔔 Notification System

The application includes a notification API.

### Get Notifications

```http
GET /api/notifications
```

### Create Notification

```http
POST /api/notifications
```

Example:

```json
{
  "type": "low-stock",
  "title": "Low Stock Alert",
  "message": "Some products need restocking"
}
```

---

## 📡 Main API Endpoints

### Authentication

```text
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Products

```text
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Sales

```text
GET  /api/sales
POST /api/sales
```

### Notifications

```text
GET  /api/notifications
POST /api/notifications
```

### Dashboard

```text
GET /api/dashboard/stats
```

---

## 🌐 Deployment

The application can be deployed using platforms such as Vercel.

Before deploying, configure the required environment variables:

```env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_secret
NEXT_PUBLIC_API_URL=your_production_url
```

Never expose private credentials in frontend code or GitHub.

---

## 🔒 Security Notes

* JWT authentication is used for protected routes.
* Admin-only routes are protected through middleware.
* Passwords should never be stored as plain text.
* Environment variables must not be committed.
* Production applications should use a strong random JWT secret.
* MongoDB credentials should remain private.

---

## 📱 Responsive Design

SmartPOS Pro is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

The dashboard and management pages use responsive layouts to provide a consistent experience across different screen sizes.

---

## 📌 Future Improvements

Planned improvements may include:

* Advanced POS checkout interface
* Barcode scanner integration
* Thermal receipt printing
* PDF invoice generation
* Advanced sales analytics
* Inventory purchase management
* Payment tracking
* User management
* Activity logs
* Advanced notification system
* Multi-branch support
* Cloud deployment improvements

---

## 👨‍💻 Development

Built as a modern full-stack POS application using:

**Next.js + TypeScript + MongoDB + Mongoose + JWT + Tailwind CSS**

---

## 📄 License

This project is currently intended for educational and business application development purposes.
