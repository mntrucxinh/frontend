# Facebook Integration Guide

Hướng dẫn sử dụng tích hợp Facebook cho frontend.

## Cấu hình

1. Thêm Facebook App ID vào file `.env.local`:
```env
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
```

2. Cấu hình Facebook App trên Facebook Developers Platform:

   **Mục đích:** Tạo và cấu hình Facebook App để ứng dụng có quyền truy cập Facebook Page của user và đăng bài lên Page đó.

   **Các bước chi tiết:**

   a. **Truy cập Facebook Developers:**
      - Vào [Facebook Developers](https://developers.facebook.com/)
      - Đăng nhập bằng tài khoản Facebook của bạn

   b. **Tạo hoặc chọn App:**
      - Nếu chưa có App: Click "My Apps" → "Create App" → Chọn loại App (thường chọn "Business")
      - Nếu đã có App: Chọn App từ danh sách

   c. **Thêm Facebook Login Product:**
      - Trong App Dashboard, tìm phần "Add a Product"
      - Click "Set Up" ở mục "Facebook Login"
      - Chọn "Web" làm platform

   d. **Cấu hình OAuth Redirect URIs:**
      - Vào Settings → Facebook Login → Settings
      - Trong phần "Valid OAuth Redirect URIs", thêm:
        - Development: `http://localhost:3000/auth/facebook/callback`
        - Production: `https://yourdomain.com/auth/facebook/callback`
      - **Lý do:** Facebook sẽ redirect user về URL này sau khi đăng nhập, và code của chúng ta sẽ nhận access_token từ đây

   e. **Request Permissions (Quyền truy cập):**
      - Vào "App Review" → "Permissions and Features"
      - Request các permissions sau:
        - `pages_show_list`: Để hiển thị danh sách Facebook Pages mà user quản lý ✅ (Bạn đã có)
        - `pages_manage_posts`: Để đăng bài lên Facebook Page ⚠️ (Cần thêm)
      
      **Cách thêm permission `pages_manage_posts`:**
      1. Trong trang "Permissions and Features", tìm ô "Search permissions and features"
      2. Gõ `pages_manage_posts` và tìm permission này
      3. Click vào permission đó
      4. Click nút "Request" hoặc "Add" để thêm vào App
      5. Điền thông tin yêu cầu (nếu có)
      
      **Lưu ý:** 
      - Ở chế độ **Development mode**: Bạn có thể test với admin/developer/tester mà không cần review
      - Status "No App Review requested" là bình thường khi ở Development mode
      - Khi chuyển sang **Live mode**, bạn sẽ cần submit App Review để Facebook approve các permissions này

   f. **Lấy App ID:**
      - Vào "Settings" → "Basic"
      - Copy "App ID" và dán vào file `.env.local` như bước 1

## Components

### 1. FacebookStatus

Hiển thị trạng thái liên kết Facebook.

```tsx
import FacebookStatus from "@/components/FacebookStatus"

<FacebookStatus showLinkButton={true} />
```

**Props:**
- `showLinkButton?: boolean` - Hiển thị nút liên kết (mặc định: true)
- `className?: string` - CSS classes tùy chỉnh

### 2. FacebookLinkButton

Nút để liên kết Facebook Page.

```tsx
import FacebookLinkButton from "@/components/FacebookLinkButton"

<FacebookLinkButton 
  onSuccess={() => console.log("Linked!")}
  className="custom-class"
/>
```

**Props:**
- `onSuccess?: () => void` - Callback khi liên kết thành công
- `className?: string` - CSS classes tùy chỉnh

### 3. FacebookRelinkModal

Modal hiển thị khi token Facebook hết hạn.

```tsx
import FacebookRelinkModal from "@/components/FacebookRelinkModal"

<FacebookRelinkModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onSuccess={() => console.log("Relinked!")}
/>
```

**Props:**
- `isOpen: boolean` - Hiển thị modal
- `onClose: () => void` - Callback khi đóng modal
- `onSuccess?: () => void` - Callback khi liên kết lại thành công

## Hooks

### useFacebookStatus

Hook để lấy trạng thái Facebook.

```tsx
import { useFacebookStatus } from "@/hook/facebook/use-facebook-status"

const { data, isLoading, error } = useFacebookStatus()

// data.linked - boolean
// data.tokenExpired - boolean
// data.pageName - string (optional)
// data.pageId - string (optional)
```

### useLinkFacebook

Hook để liên kết Facebook.

```tsx
import { useLinkFacebook } from "@/hook/facebook/use-link-facebook"

const linkFacebook = useLinkFacebook()

linkFacebook.mutate(
  { user_access_token: "facebook_access_token" },
  {
    onSuccess: () => console.log("Success!"),
    onError: (error) => console.error(error),
  }
)
```

## Xử lý lỗi

### Sử dụng handleFacebookError

```tsx
import { handleFacebookError } from "@/lib/facebook-error-handler"
import { api } from "@/lib/axios"

try {
  const response = await api.post("/posts/facebook", { message: "Hello" })
} catch (error) {
  handleFacebookError(
    error,
    () => {
      // Token expired - show relink modal
      setShowRelinkModal(true)
    },
    () => {
      // Not linked - show notification
      toast.error("Vui lòng liên kết Facebook")
    }
  )
}
```

### Sử dụng withFacebookErrorHandling

```tsx
import { withFacebookErrorHandling } from "@/lib/facebook-error-handler"
import { api } from "@/lib/axios"

const result = await withFacebookErrorHandling(
  () => api.post("/posts/facebook", { message: "Hello" }),
  () => setShowRelinkModal(true), // onTokenExpired
  () => toast.error("Chưa liên kết Facebook") // onNotLinked
)
```

## Error Codes

Backend API sẽ trả về các error codes sau:

- `facebook_token_expired` - Token Facebook đã hết hạn
- `facebook_not_linked` - Chưa liên kết Facebook

## Ví dụ sử dụng đầy đủ

Xem file `components/FacebookIntegrationExample.tsx` để xem ví dụ tích hợp đầy đủ.

## API Endpoints

### POST /auth/facebook/link

Liên kết Facebook Page.

**Headers:**
```
Authorization: Bearer <JWT>
```

**Body:**
```json
{
  "user_access_token": "<facebook_access_token>"
}
```

**Response:**
```json
{
  "message": "Linked successfully",
  "linked": true
}
```

### GET /auth/facebook/status

Kiểm tra trạng thái Facebook.

**Headers:**
```
Authorization: Bearer <JWT>
```

**Response:**
```json
{
  "linked": true,
  "pageName": "My Page",
  "pageId": "123456789",
  "tokenExpired": false
}
```

## Luồng OAuth

1. User click "Liên kết Facebook"
2. Mở popup Facebook OAuth
3. User đăng nhập và chọn Page
4. Facebook redirect về `/auth/facebook/callback` với access_token
5. Callback page gọi API `POST /auth/facebook/link`
6. Popup đóng và gửi message về parent window
7. Parent window cập nhật trạng thái

