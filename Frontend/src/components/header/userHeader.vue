<template>

    <div class="h-full grid grid-cols-2 gap-4">
        <div class="flex items-center">
            <form class="relative w-3/4 h-24"> <!-- Change w-1/3 to w-full -->
                <button class="absolute left-2 transform -translate-y-1/2 top-1/3 mt-1 p-1">
                    <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
                        aria-labelledby="search" class="w-5 h-5 text-gray-700">
                        <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                            stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                    </svg>
                </button>
                <input
                    class="rounded-full h-1/2 w-3/4 px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
                    placeholder="Nhập mã lớp" required="" type="text" />
                <button type="reset" class="absolute transform -translate-y-1/2 top-1/3 left-2/3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-700" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </form>
        </div>

        <!-- Actions -->
        <div class="flex justify-end items-center">
            <a-avatar
                class="text-orange-600 bg-orange-200 absolute transform -translate-x-1/2 translate-y-1/2 top-0 ">B</a-avatar>

        </div>



    </div>


</template>

<script>
export default {

}
</script>

<style scoped>

</style>