### Project Summary: ImbentaryoHub

#### Overview
**ImbentaryoHub** is a comprehensive inventory management system designed to streamline business operations by managing items, users, and business-related data in a secure and organized manner. The project is built using the React frontend and Node.js backend, along with MongoDB for data storage. The application supports various user roles, business profiles, item tracking, and detailed logs, making it a complete solution for small and medium-sized enterprises.

---

### Key Features
1. **User Authentication and Authorization**
   - Secure login and registration system for business owners.
   - Role-based access control for `owner`, `sub-owner`, and `employee` users.
   - Protected routes for critical business operations.
   - Persistent session management using JWT tokens.

2. **Business Management**
   - Ability to create a new business with a unique business name and associate it with an owner.
   - A single business can have multiple users such as sub-owners and employees.
   - A dedicated **Business Profile Page** displays key business information like owner details, address, contact information, and the number of users.

3. **User Management**
   - Owner users can create new users (sub-owners or employees) through a **Create User** page.
   - User roles (`sub-owner` and `employee`) have specific permissions, ensuring that sensitive business operations are controlled.
   - A **UserCard** component allows for viewing detailed information of each user, including `firstName`, `lastName`, `username`, `email`, `address`, `contactNumber`, and `userType`.

4. **Inventory Management**
   - Comprehensive inventory management for items linked to a business.
   - Each business has a unique inventory that tracks items added by different users.
   - The ability to **add, remove, and update items** in real-time.
   - Categorization of items based on predefined categories such as `Electronics`, `Fashion`, `Groceries`, etc.
   - Each item has attributes like name, category, subcategory, value, quantity, brand, and expiration date.

5. **Detailed Logs**
   - View and maintain an **activity log** of all inventory changes and user actions.
   - Logs record the date, time, action performed, item affected, quantity changed, and the user who performed the action.
   - Helps in auditing and tracking changes in the business inventory.

6. **Dashboard and Charts**
   - A **dashboard** that provides a visual overview of business performance.
   - Charts for:
     - **Items by Category** (Donut Chart)
     - **Monthly Sales** (Line Chart)
     - **Inventory Changes** (Bar Chart)
     - **Category Monthly Sales** (Stacked Bar Chart)
   - Real-time data updates for sales, items added, and inventory removed.

7. **UI Components and Styling**
   - Tailwind CSS for responsive, modern, and consistent UI design.
   - Components such as `Modal`, `Sidebar`, `UserCard`, and `Header` are styled to enhance user experience.
   - All forms, tables, and modals are built to be responsive across different screen sizes.

8. **Business Profile**
   - A dedicated page showing business information such as the business name, owner details, address, and the number of users.
   - An option to **view all users** under the business, with clickable usernames to view user-specific information.
   - `UserCard` popup to view user details in a well-structured modal.

9. **Header and Navigation**
   - Dynamic navigation bar with role-specific links and a logout button.
   - Smooth transitions and responsive layouts for easy navigation.
   - Links to **Home**, **Create User**, **Inventory**, **Logs**, and **Business Profile**.

---

### Technology Stack
1. **Frontend:**
   - React.js
   - Tailwind CSS for styling
   - Axios for API calls

2. **Backend:**
   - Node.js
   - Express.js
   - JWT for authentication

3. **Database:**
   - MongoDB with Mongoose for schema modeling

4. **Additional Libraries:**
   - Chart.js for data visualization
   - React Router for navigation and route management

---

### Future Enhancements
1. **Enhanced Role Permissions:**
   - Implement fine-grained permissions for more control over user actions based on roles.
   
2. **Notifications and Alerts:**
   - Email notifications for key business events such as low inventory levels or new users added.
   
3. **Reports and Exporting Data:**
   - Add functionality to generate and export business and inventory reports in PDF or Excel formats.

4. **Multi-Business Support:**
   - Allow a single owner to manage multiple businesses.

5. **Inventory Forecasting:**
   - Predictive analytics to help businesses forecast inventory needs based on historical trends.

With these features, **ImbentaryoHub** offers a robust foundation for efficient business and inventory management, providing a centralized platform for owners to monitor and control their operations seamlessly.
