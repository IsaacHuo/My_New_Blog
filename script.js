// 天涯社区博客网站交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initSidebarToggle();
    initPostInteractions();
    initSearchFunctionality();
    initResponsiveNavigation();
});

// 侧边栏切换功能
function initSidebarToggle() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 移除其他项目的active状态
            sidebarItems.forEach(otherItem => {
                otherItem.classList.remove('current');
            });
            
            // 添加current状态到当前项目
            this.classList.add('current');
            
            // 如果有子项目，切换显示
            const subsection = this.nextElementSibling;
            if (subsection && subsection.classList.contains('subsection')) {
                const isVisible = subsection.style.display === 'block';
                subsection.style.display = isVisible ? 'none' : 'block';
            }
        });
    });
}

// 帖子交互功能
function initPostInteractions() {
    const postItems = document.querySelectorAll('.post-item');
    
    postItems.forEach(post => {
        // 鼠标悬停效果
        post.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f8ff';
        });
        
        post.addEventListener('mouseleave', function() {
            if (!this.classList.contains('pinned')) {
                this.style.backgroundColor = '';
            }
        });
        
        // 点击帖子标题
        const postTitle = post.querySelector('.post-title');
        if (postTitle) {
            postTitle.addEventListener('click', function(e) {
                e.preventDefault();
                // 模拟打开帖子详情
                console.log('打开帖子:', this.textContent);
                // 这里可以添加跳转到帖子详情页面的逻辑
            });
        }
    });
}

// 搜索功能
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    if (searchInput && searchButton) {
        // 搜索按钮点击事件
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch(searchInput.value);
        });
        
        // 回车搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
        
        // 搜索提示
        searchInput.addEventListener('focus', function() {
            this.placeholder = '输入关键词搜索...';
        });
        
        searchInput.addEventListener('blur', function() {
            this.placeholder = '站内搜索';
        });
    }
}

// 执行搜索
function performSearch(query) {
    if (query.trim() === '') {
        alert('请输入搜索关键词');
        return;
    }
    
    console.log('搜索关键词:', query);
    // 这里可以添加实际的搜索逻辑
    alert(`搜索功能演示: "${query}"`);
}

// 响应式导航
function initResponsiveNavigation() {
    // 检查屏幕尺寸变化
    function checkScreenSize() {
        const sidebar = document.querySelector('.sidebar');
        const rightSidebar = document.querySelector('.right-sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (window.innerWidth <= 1024) {
            // 移动端布局
            if (sidebar) sidebar.style.display = 'none';
            if (rightSidebar) rightSidebar.style.display = 'none';
            if (mainContent) {
                mainContent.style.marginLeft = '0';
                mainContent.style.marginRight = '0';
            }
        } else {
            // 桌面端布局
            if (sidebar) sidebar.style.display = 'block';
            if (rightSidebar) rightSidebar.style.display = 'block';
            if (mainContent) {
                mainContent.style.marginLeft = '150px';
                mainContent.style.marginRight = '200px';
            }
        }
    }
    
    // 初始检查
    checkScreenSize();
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkScreenSize);
}

// 发表帖子功能
function initPostButton() {
    const postBtn = document.querySelector('.post-btn');
    if (postBtn) {
        postBtn.addEventListener('click', function() {
            // 模拟发表帖子对话框
            const title = prompt('请输入帖子标题:');
            if (title && title.trim() !== '') {
                alert(`帖子 "${title}" 发表成功！`);
                // 这里可以添加实际的发帖逻辑
            }
        });
    }
}

// 导航栏下拉菜单功能
function initDropdownMenus() {
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            // 模拟下拉菜单
            alert('下拉菜单功能演示');
        });
    });
}

// 初始化所有按钮功能
document.addEventListener('DOMContentLoaded', function() {
    initPostButton();
    initDropdownMenus();
});

// 页面滚动效果
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 向下滚动时隐藏导航栏，向上滚动时显示
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 添加页面加载动画
function addLoadingAnimation() {
    const postItems = document.querySelectorAll('.post-item');
    
    postItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 50);
    });
}

// 在页面加载完成后添加动画
window.addEventListener('load', function() {
    addLoadingAnimation();
    initScrollEffects();
});

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    // ESC键关闭可能的弹窗
    if (e.key === 'Escape') {
        // 关闭任何打开的模态框或下拉菜单
        console.log('ESC键被按下');
    }
    
    // Ctrl+F 焦点到搜索框
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
});
