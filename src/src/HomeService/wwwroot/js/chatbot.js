/* Chatbot Rules-Based Logic */

const ChatBot = {
    rules: [
        {
            keywords: ['chào', 'xin chào', 'hello', 'hi', 'alo', 'chao'],
            response: 'Chào bạn! 👋 Tôi là trợ lý ảo của DichVuSuaChuaNhaCua.\n\nTôi có thể giúp bạn:\n• Tìm hiểu dịch vụ\n• Bảng giá\n• Đặt lịch sửa chữa\n• Thông tin bảo hành\n\nBạn cần gì ạ?'
        },
        {
            keywords: ['giá', 'bảng giá', 'chi phí', 'bao nhiêu', 'gia', 'bang gia', 'chi phi', 'bao nhieu'],
            response: '💰 **Bảng giá tham khảo:**\n\n• Sửa điện cơ bản: Từ 200.000đ\n• Thay cầu dao, aptômát: Từ 150.000đ\n• Sửa ống nước rò rỉ: Từ 250.000đ\n• Vệ sinh máy lạnh: Từ 150.000đ\n• Sơn nhà: Từ 35.000đ/m²\n\n👉 Xem chi tiết tại trang **Dịch vụ** trên menu!'
        },
        {
            keywords: ['đặt lịch', 'đặt', 'booking', 'dat lich', 'dat'],
            response: '📅 **Đặt lịch sửa chữa:**\n\n1. Đăng nhập/đăng ký tài khoản\n2. Chọn dịch vụ cần sửa\n3. Nhập thông tin và chọn ngày giờ\n4. Xác nhận đặt lịch\n\n⚡ Đội ngũ sẽ liên hệ trong vòng **30 phút** sau khi đặt lịch!'
        },
        {
            keywords: ['đăng ký', 'tài khoản', 'đăng nhập', 'dang ky', 'tai khoan', 'dang nhap'],
            response: '🔐 **Đăng ký tài khoản:**\n\n• Truy cập trang **Đăng ký** trên menu\n• Nhập thông tin cá nhân\n• Xác nhận qua email\n\nBạn đã có tài khoản? Chọn **Đăng nhập** ngay!'
        },
        {
            keywords: ['điện', 'sửa điện', 'thay cầu', 'aptômát', 'dien', 'sua dien', 'thay cau', 'ap to mat'],
            response: '⚡ **Dịch vụ sửa điện:**\n\n• Sửa điện cơ bản: 200.000đ\n• Thay cầu dao, aptômát: 150.000đ\n• Lắp đặt thiết bị điện\n• Xử lý chập điện, mất điện\n\n📞 Hotline: 1900 xxxx (miễn phí)'
        },
        {
            keywords: ['nước', 'sửa nước', 'ống nước', 'nước rò', 'nuoc', 'sua nuoc', 'ong nuoc', 'nuoc roi'],
            response: '💧 **Dịch vụ sửa nước:**\n\n• Sửa ống nước rò rỉ: 250.000đ\n• Thông tắc cống\n• Sửa vòi nước\n• Lắp đặt thiết bị vệ sinh\n\n🔧 Thợ chuyên nghiệp, bảo hành 12 tháng!'
        },
        {
            keywords: ['máy lạnh', 'điều hòa', 'máy lạnh', 'may lanh', 'dieu hoa'],
            response: '❄️ **Dịch vụ máy lạnh:**\n\n• Vệ sinh máy lạnh: 150.000đ\n• Sửa chữa máy lạnh\n• Lắp đặt máy lạnh mới\n• Thu mua máy cũ\n\n⏰ Phục vụ 8h-22h hàng ngày!'
        },
        {
            keywords: ['sơn', 'sơn nhà', 'sơn lại', 'son', 'son nha', 'son lai'],
            response: '🎨 **Dịch vụ sơn nhà:**\n\n• Sơn lại nhà: Từ 35.000đ/m²\n• Sơn phủ chống thấm\n• Sơn nội thất, ngoại thất\n• Tư vấn màu sắc miễn phí\n\n📋 Khảo sát miễn phí trước khi thi công!'
        },
        {
            keywords: ['thợ', 'thợ ở đâu', 'thợ nào', 'đội ngũ', 'tho', 'tho o dau', 'tho nao', 'doi ngu'],
            response: '👷 **Đội ngũ thợ:**\n\n• Hơn 100 thợ lành nghề\n• Hơn 10 năm kinh nghiệm\n• Đã phục vụ 500+ khách hàng\n• Được đào tạo bài bản\n\n✅ Uy tín - Chất lượng - Bảo hành!'
        },
        {
            keywords: ['giờ', 'mở cửa', 'hoạt động', 'thời gian', 'gio', 'mo cua', 'hoat dong', 'thoi gian'],
            response: '⏰ **Giờ làm việc:**\n\n• Thứ 2 - Thứ 7: **8h - 22h**\n• Chủ nhật: **9h - 18h**\n• Nghỉ lễ: Theo thông báo\n\n📞 Hotline hoạt động **24/7**!'
        },
        {
            keywords: ['bảo hành', 'bảo trì', 'bao hanh', 'bao tri'],
            response: '🛡️ **Chính sách bảo hành:**\n\n• Thời hạn: **12 tháng**\n• Bảo hành miễn phí các lỗi kỹ thuật\n• Hỗ trợ khắc phục trong **24 giờ**\n• Bảo trì định kỳ theo yêu cầu\n\n📝 Lưu giữ hóa đơn để được bảo hành!'
        },
        {
            keywords: ['liên hệ', 'hotline', 'số điện thoại', 'email', 'lien he', 'so dien thoai'],
            response: '📞 **Liên hệ DichVuSuaChuaNhaCua:**\n\n• Hotline: 1900 xxxx (miễn phí)\n• Email: contact@dichvusuachuanhacua.vn\n• Zalo: 0912 xxx xxx\n• Facebook: /dichvusuachuanhacua\n\n📍 Địa chỉ: Cầu Giấy, Hà Nội'
        },
        {
            keywords: ['tên', 'tên công ty', 'là ai', 'ten', 'ten cong ty', 'la ai'],
            response: '🏢 **DichVuSuaChuaNhaCua**\n\nHệ thống đặt lịch dịch vụ sửa chữa nhà cửa hàng đầu tại Việt Nam.\n\n• Thành lập: 2024\n• Khẩu hiệu: "Sửa chữa nhanh, bảo hành lâu"\n• Phục vụ: Hà Nội và các tỉnh lân cận'
        },
        {
            keywords: ['cảm ơn', 'cám ơn', 'thank', 'bye', 'tạm biệt', 'cam on', 'tam biet'],
            response: '🙏 Cảm ơn bạn đã sử dụng DichVuSuaChuaNhaCua!\n\nNếu cần hỗ trợ thêm, hãy nhắn tin cho tôi bất cứ lúc nào.\n\nChúc bạn một ngày tốt lành! 😊'
        },
        {
            keywords: ['phản hồi', 'đánh giá', 'review', 'feedback', 'phan hoi', 'danh gia'],
            response: '⭐ **Phản hồi khách hàng:**\n\n• Nguyễn Thu Hà (Cầu Giấy): "Thợ rất chuyên nghiệp!"\n• Trần Văn Nam (Thanh Xuân): "Sửa nhanh, giá hợp lý!"\n\n👉 Bạn cũng có thể để lại đánh giá sau khi sử dụng dịch vụ!'
        }
    ],

    greetings: 'Chào bạn! 👋 Tôi là trợ lý ảo của **DichVuSuaChuaNhaCua**.\n\nBạn có thể hỏi tôi về:\n• Dịch vụ & bảng giá\n• Đặt lịch sửa chữa\n• Thông tin bảo hành\n• Giờ làm việc\n\nHoặc chọn một gợi ý bên dưới!',

    quickReplies: ['Giá dịch vụ', 'Đặt lịch', 'Bảo hành', 'Giờ mở cửa'],

    init() {
        this.window = document.getElementById('chatbot-window');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-input');
        this.toggleBtn = document.getElementById('chatbot-toggle');
        this.closeBtn = document.getElementById('chatbot-close');
        this.quickRepliesContainer = document.getElementById('chatbot-quick-replies');

        if (!this.window || !this.toggleBtn) return;

        this.toggleBtn.addEventListener('click', () => this.toggle());
        this.closeBtn.addEventListener('click', () => this.close());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        this.showGreetings();
    },

    toggle() {
        this.window.classList.toggle('active');
    },

    close() {
        this.window.classList.remove('active');
    },

    showGreetings() {
        this.addMessage(this.greetings, 'bot');
        this.showQuickReplies(this.quickReplies);
    },

    showQuickReplies(replies) {
        this.quickRepliesContainer.innerHTML = '';
        replies.forEach(reply => {
            const btn = document.createElement('button');
            btn.className = 'chatbot-quick-reply';
            btn.textContent = reply;
            btn.addEventListener('click', () => {
                this.input.value = reply;
                this.sendMessage();
            });
            this.quickRepliesContainer.appendChild(btn);
        });
    },

    sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.input.value = '';
        this.quickRepliesContainer.innerHTML = '';

        this.showTyping();

        setTimeout(() => {
            this.hideTyping();
            const answer = this.findAnswer(text);
            this.addMessage(answer, 'bot');
            this.showQuickReplies(['Dịch vụ', 'Đặt lịch', 'Liên hệ']);
        }, 800 + Math.random() * 800);
    },

    addMessage(text, sender) {
        const bubble = document.createElement('div');
        bubble.className = `chatbot-bubble ${sender}`;
        bubble.innerHTML = this.formatText(text);
        this.messagesContainer.appendChild(bubble);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    },

    formatText(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    },

    showTyping() {
        const typing = document.createElement('div');
        typing.className = 'chatbot-bubble bot';
        typing.id = 'chatbot-typing';
        typing.innerHTML = '<div class="chatbot-typing"><span></span><span></span><span></span></div>';
        this.messagesContainer.appendChild(typing);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    },

    hideTyping() {
        const typing = document.getElementById('chatbot-typing');
        if (typing) typing.remove();
    },

    removeVietnameseTones(str) {
        const tones = {
            'a': 'áàảãạăắằẳẵặâấầẩẫậ',
            'd': 'đ',
            'e': 'éèẻẽẹêếềểễệ',
            'i': 'íìỉĩị',
            'o': 'óòỏõọôốồổỗộơớờởỡợ',
            'u': 'úùủũụưứừửữự',
            'y': 'ýỳỷỹỵ'
        };
        for (let [key, value] of Object.entries(tones)) {
            for (let char of value) {
                str = str.split(char).join(key);
            }
        }
        return str.toLowerCase();
    },

    findAnswer(message) {
        const normalized = this.removeVietnameseTones(message.toLowerCase());

        for (let rule of this.rules) {
            for (let keyword of rule.keywords) {
                const normalizedKeyword = this.removeVietnameseTones(keyword.toLowerCase());
                if (normalized.includes(normalizedKeyword)) {
                    return rule.response;
                }
            }
        }

        return 'Xin lỗi, tôi chưa hiểu câu hỏi của bạn. 😅\n\nBạn có thể hỏi về:\n• Giá dịch vụ\n• Đặt lịch sửa chữa\n• Bảo hành\n• Giờ mở cửa\n• Thông tin liên hệ';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ChatBot.init();
});
