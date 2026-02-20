# MongoDB Atlas Setup Guide for Trusted Escort

## **The Problem You're Facing**

Your backend logs show:
```
MongoDB connection error: connect ECONNREFUSED ::1:27017
MONGODB_CONFIGURED: false
```

This means **the MONGODB_URI environment variable is NOT set on Render.**

---

## **Complete Solution (Follow These Steps Exactly)**

### **Step 1: Verify Your MongoDB Connection Details**

Your connection string should be:
```
mongodb+srv://trustedescort:Kold800%2A@trustedescort.hpw445b.mongodb.net/trustedescort?retryWrites=true&w=majority
```

**Important:** The password `*` is encoded as `%2A`

---

### **Step 2: Add MONGODB_URI to Render Environment**

**EXACTLY Follow These Steps:**

1. **Go to:** https://dashboard.render.com
2. **Click on your backend service** (named "trustedescort" or similar)
3. **In the left sidebar, click "Environment"**
4. **You should see a section that says "Environment Variables"**
5. **Look for a button that says "+ Add Environment Variable"** or **"Add Variable"**
6. **Click that button**

7. **In the text field labeled "Name", type:**
   ```
   MONGODB_URI
   ```

8. **In the text field labeled "Value", paste your connection string:**
   ```
   mongodb+srv://trustedescort:Kold800%2A@trustedescort.hpw445b.mongodb.net/trustedescort?retryWrites=true&w=majority
   ```

9. **Click the "Save" button** (usually at the bottom right)

10. **IMPORTANT: Wait for the page to refresh**

---

### **Step 3: Redeploy the Backend Service**

1. **After saving, you should see a notification that the service is restarting**
2. **Click on "Logs" in the left sidebar**
3. **Watch the logs as the service redeploys**
4. **Wait until you see:**
   ```
   ==> Your service is live 🎉
   🔧 MongoDB URI configured: ✅ Atlas Connection
   ✅ MongoDB connected successfully
   ```

5. **If you see "Localhost Connection" or "MONGODB_CONFIGURED: false", the variable was NOT saved correctly. Try again.**

---

### **Step 4: Test the Admin Setup**

Once MongoDB is connected, run this command:

```bash
curl -X POST https://trustedescort.onrender.com/api/auth/admin/setup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "trusted7061@gmail.com",
    "password": "Kold800*",
    "setupKey": "TRUSTED_ESCORT_SETUP_KEY_2024"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "Super admin account created successfully",
  "admin": {
    "email": "trusted7061@gmail.com",
    "role": "admin"
  }
}
```

---

### **Step 5: Login to Admin Dashboard**

1. Go to: **https://trustedescort.in/admin/login**
2. Enter:
   - Email: `trusted7061@gmail.com`
   - Password: `Kold800*`
3. Click **"Login as Admin"**
4. You should be redirected to the admin dashboard

---

## **Troubleshooting**

### **Issue: Still seeing "Localhost Connection"**

**Solution:**
1. Go back to Render Environment tab
2. **DELETE the variable** if it exists
3. Click "+ Add Variable" again
4. Paste the connection string very carefully
5. Click Save
6. Wait for redeploy

### **Issue: "MONGODB_CONFIGURED: false"**

The environment variable was NOT saved. Try these:
1. Make sure you clicked the **"Save"** button
2. Wait for the page to refresh
3. Scroll down to verify the variable is listed
4. If not, try again from Step 2

### **Issue: Admin setup still times out**

Wait 5 minutes after seeing "Your service is live 🎉" before testing admin setup. MongoDB can take time to initialize the connection.

---

## **Important Notes**

- ⚠️ **Do NOT include** `<` or `>` symbols in the connection string
- ⚠️ **Do ALWAYS encode** special characters: `*` → `%2A`, `@` → `%40`
- ⚠️ **Do NOT share** your connection string publicly
- ✅ **Do verify** the connection logs before testing

---

## **Quick Reference**

| Item | Value |
|------|-------|
| MongoDB Username | `trustedescort` |
| MongoDB Password | `Kold800*` (encoded as `Kold800%2A`) |
| Cluster Name | `trustedescort` |
| Connection String | `mongodb+srv://trustedescort:Kold800%2A@trustedescort.hpw445b.mongodb.net/trustedescort?retryWrites=true&w=majority` |
| Admin Email | `trusted7061@gmail.com` |
| Admin Password | `Kold800*` |
| Setup Key | `TRUSTED_ESCORT_SETUP_KEY_2024` |

---

**Last Updated:** February 20, 2026
