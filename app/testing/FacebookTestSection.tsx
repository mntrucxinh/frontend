"use client"

import FacebookStatus from '@/components/FacebookStatus'
import FacebookLinkButton from '@/components/FacebookLinkButton'
import FacebookIntegrationExample from '@/components/FacebookIntegrationExample'

export default function FacebookTestSection() {
  return (
    <div style={{ marginTop: '24px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '16px' }}>Facebook Integration Test</h2>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ marginBottom: '8px' }}>Trạng thái Facebook:</h3>
        <FacebookStatus showLinkButton={true} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ marginBottom: '8px' }}>Nút liên kết Facebook:</h3>
        <FacebookLinkButton 
          onSuccess={() => {
            console.log('Facebook linked successfully!')
          }}
        />
      </div>
      <div style={{ marginTop: '24px' }}>
        <FacebookIntegrationExample />
      </div>
    </div>
  )
}

