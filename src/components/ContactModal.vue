<template>
  <Transition name="fade">
    <div v-if="visible" class="modal-overlay" @click="$emit('close')">
      <div class="modal contact-modal" @click.stop>
        <div class="modal-header">
          <h3>联系我</h3>
          <button @click="$emit('close')" class="close-btn">×</button>
        </div>
        <div class="modal-content">
          <div class="contact-info">
            <h4>加Q群：105653726</h4>
            <div class="qr-code">
              <img src="/QQ 群.png" alt="QQ群二维码" class="qr-image">
            </div>
            <p class="contact-desc">扫描二维码或搜索群号加入技术交流群</p>
            <div style="margin-top: 15px;">
              <p><strong>邮箱:</strong> 2210286979@qq.com</p>
              <p><strong>GitHub:</strong> https://github.com/IsaacHuo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'ContactModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close']
}
</script>

<style scoped>
/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  position: relative;
}

.contact-modal {
  width: 400px;
}

.modal-header {
  background: linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 15px 20px;
  border-radius: 12px 12px 0 0;
  text-align: center;
  position: relative;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.modal-content {
  padding: 25px;
}

.contact-info h4 {
  color: #1f2937;
  text-align: center;
  margin-bottom: 15px;
  font-size: 16px;
}

.qr-code {
  text-align: center;
  margin: 20px 0;
}

.qr-image {
  width: 150px;
  height: 150px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contact-desc {
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  margin: 15px 0;
}

.contact-info p {
  color: #4b5563;
  margin: 8px 0;
  font-size: 14px;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .modal,
.fade-leave-active .modal {
  transition: transform 0.3s ease;
}

.fade-enter-from .modal,
.fade-leave-to .modal {
  transform: scale(0.9) translateY(-20px);
}
</style>
