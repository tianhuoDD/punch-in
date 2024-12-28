<template>
  <div class="clock-in-list-container">
    <!-- 打卡记录列表 -->
    <div>
      <PunchBlock
        v-for="(record, index) in records"
        :key="index"
        :thumb="record.img"
        :title="record.title"
        :description="record.content"
        :createdAt="record.createdAt"
      />
    </div>
    <!-- 分页控件 -->
    <van-pagination
      v-if="totalPages > 1"
      v-model="currentPage"
      :total-items="totalRecords"
      :items-per-page="perPage"
      :page-sizes="[10, 20, 50]"
      @change="handlePageChange"
      @page-size-change="handlePageSizeChange"
      mode="simple"
      class="pagination"
    />
  </div>
</template>

<script setup>
import PunchBlock from '@/components/PunchBlock.vue'
import { useNavbarStore } from '@/stores/counter' // 引入 Pinia store
import { ref, onMounted } from 'vue'
import { getAllClockInsApi } from '@/api/punchin'
import { showToast } from 'vant'

// 获取导航栏 store 实例
const navbarStore = useNavbarStore()
// 设置左侧按钮显示为 false，右侧按钮显示为 true
navbarStore.toggleLeftButton(false)
navbarStore.toggleRightButton(true)

// 定义响应式变量
const records = ref([]) // 存储打卡记录
const currentPage = ref(1) // 当前页数
const perPage = ref(10) // 每页记录数
const totalRecords = ref(0) // 总记录数
const totalPages = ref(1) // 总页数
const isLoading = ref(false) // 加载状态

/**
 * 获取打卡记录的函数
 * @param {number} page - 页码
 * @param {number} perPageCount - 每页记录数
 */
const fetchClockIns = async (page, perPageCount) => {
  isLoading.value = true
  try {
    const response = await getAllClockInsApi({
      page,
      per_page: perPageCount
    })
    if (response.code === 200) {
      records.value = response.data.records
      totalRecords.value = response.data.pagination.total_records
      totalPages.value = response.data.pagination.total_pages
    } else {
      showToast(`加载失败: ${response.message}`)
      records.value = []
    }
  } catch (error) {
    console.error('获取打卡记录失败:', error)
    showToast('网络错误，请稍后重试')
    records.value = []
  } finally {
    isLoading.value = false
  }
}

/**
 * 处理页码变化
 * @param {number} page - 新的页码
 */
const handlePageChange = (page) => {
  currentPage.value = page
  fetchClockIns(page, perPage.value)
}

/**
 * 处理每页记录数变化
 * @param {number} size - 新的每页记录数
 */
const handlePageSizeChange = (size) => {
  perPage.value = size
  currentPage.value = 1 // 重置到第一页
  fetchClockIns(1, size)
}

// 在组件挂载时获取初始数据
onMounted(() => {
  fetchClockIns(currentPage.value, perPage.value)
})
</script>

<style scoped>
.clock-in-list-container {
  padding: 16px;
}

.pagination {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}
</style>
