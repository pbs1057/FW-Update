<template>
    <div class="w-[500px] px-4">
        <n-gradient-text type="info" :size="36">FW SERVER</n-gradient-text>
        <n-card>
            <template #header>
                <n-gradient-text type="info" :size="24">Login</n-gradient-text>
            </template>
            <n-form>
                <n-form-item label="아이디">
                    <n-input v-model:value="username" placeholder="" />
                </n-form-item>
                <n-form-item label="비밀번호">
                    <n-input v-model:value="password" type="password" placeholder="" />
                </n-form-item>
            </n-form>
            <template #footer>
                <n-space>
                    <n-button type="info" @click="handleSave">login</n-button>
                    <n-button type="info" ghost @click="handleReset">Reset</n-button>
                </n-space>
            </template>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/useAuthStore'

const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const handleSave = () => {
    if (!username.value || !password.value) {
        alert('Please enter both username and password.')
        return
    }
    const success = authStore.login(username.value, password.value)
    if (!success) {
        alert('Invalid username or password.')
    }
}

const handleReset = () => {
    username.value = ''
    password.value = ''
}

</script>

<style scoped src="./common-table-styles.css"></style>