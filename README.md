# 🎨 Flexbox Generator - Professional Tool for Developers

[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/yourusername/flexbox-generator)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-Ready-success.svg)](manifest.json)

> **เครื่องมือสร้าง Flexbox แบบ Interactive พร้อมการสนับสนุน Tailwind CSS, Presets และ Responsive Preview**

Interactive Flexbox Generator ที่ออกแบบมาสำหรับนักพัฒนา UI Designer และผู้เรียน CSS โดยมีธีมสีเขียวและดำแบบมืออาชีพ พร้อมฟีเจอร์ครบครันสำหรับการทำงานกับ Flexbox

## ✨ ฟีเจอร์หลัก

### 🎯 Interactive Visualizer
- ปรับค่าทุก property ของ flexbox (display, flex-direction, wrap, justify, align, gap, padding)
- เห็นผลการเปลี่ยนแปลงทันที
- Drag-and-drop item หรือกำหนดค่าราย item: grow, shrink, basis, order, align-self

### 📋 Copy CSS/Tailwind
- ปุ่ม Copy โค้ด CSS/Tailwind ที่ตั้งไว้แล้ว
- Support ทั้ง CSS ปกติ และ Tailwind CSS classes
- Export HTML structure พร้อม CSS

### 📱 Responsive Preview
- Toggle ดู mobile/tablet/desktop (320–1200px)
- Preview แบบ real-time
- ปรับขนาดหน้าจอได้

### 🎛️ Presets & Theme Switch
- Preset layout เช่น Center, Space-between, Card, Responsive row
- ปุ่มเปลี่ยน Light/Dark Mode (default = dark)
- บันทึกการตั้งค่าอัตโนมัติ

### 💾 Export/Save/Share
- Export JSON config หรือดาวน์โหลด HTML/CSS
- Save ใน localStorage
- สร้าง Permalink แบ่งปัน config

### ♿ Accessibility & Keyboard
- ปรับค่าด้วย keyboard (Tab/Enter/Arrow)
- Focus ring และ aria-label ครบครัน
- ใส่ tooltip หรือ helper text อธิบาย properties
- แจ้งเตือนถ้าค่าที่ตั้งกระทบ accessibility

### 🌐 Internationalization
- UI ภาษาอังกฤษ/ไทยสลับได้
- การแปลแบบ dynamic

### 📜 History/Undo Redo
- Undo/Redo การเปลี่ยนแปลง (Ctrl+Z / Ctrl+Shift+Z)
- เก็บประวัติการแก้ไข 50 ครั้งล่าสุด

### 🚀 Performance/PWA
- โหลดไว, รองรับ mobile/PWA
- Service Worker สำหรับ offline usage
- Cache strategy สำหรับ performance

### 💬 Container Types (NEW!)
- **Flexbox Container**: สำหรับการจัดวาง layout แบบ flexbox
- **Bubble Container**: สร้าง message bubbles แบบ chat interface
- **Carousel Container**: สร้าง carousel/slider แบบ interactive

## ⚡ Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/flexbox-generator.git
cd flexbox-generator
```

### 2. เปิดในเบราว์เซอร์
```bash
# ใช้ live server หรือเปิดไฟล์ index.html ใน browser
# สำหรับ development
npx serve .
# หรือ
python -m http.server 8000
```

### 3. เข้าใช้งาน
เปิดเบราว์เซอร์และไปที่ `http://localhost:8000`

## 🏗️ โครงสร้างโปรเจค

```
flexbox-generator/
├── index.html          # ไฟล์ HTML หลัก
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── README.md          # เอกสารนี้
└── code.md            # ข้อกำหนดเริ่มต้น
```

## 🎨 การใช้งาน

### การปรับแต่งพื้นฐาน
1. **เลือก Display Type**: `flex` หรือ `inline-flex`
2. **กำหนด Direction**: `row`, `column`, `row-reverse`, `column-reverse`
3. **ตั้งค่า Wrap**: `nowrap`, `wrap`, `wrap-reverse`
4. **จัดตำแหน่ง**: ใช้ `justify-content` และ `align-items`
5. **ปรับ Gap และ Padding**: ใช้ slider controls

### การจัดการ Items
- **เพิ่ม/ลบ Items**: ใช้ปุ่ม Add/Remove Item
- **เลือก Item**: คลิกที่ item ใน preview
- **ปรับแต่งแต่ละ Item**: ตั้งค่า flex, align-self, order

### Presets ที่มีให้
- **Center**: จัดกึ่งกลางทั้งแนวนอนและแนวตั้ง
- **Space Between**: กระจายเว้นระยะเท่ากัน
- **Card**: Layout แบบการ์ดแนวตั้ง
- **Responsive**: Layout ที่ responsive wrap

### การ Export
1. **Copy Code**: คลิกปุ่ม Copy เพื่อคัดลอกโค้ด CSS/Tailwind/HTML
2. **Export Config**: ดาวน์โหลดไฟล์ JSON configuration
3. **Share**: สร้าง URL สำหรับแชร์การตั้งค่า

## 🛠️ เทคโนโลยีที่ใช้

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript ES6+**: Modern JavaScript features
- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: Icons
- **PWA**: Progressive Web App features
- **Service Worker**: Offline functionality

## 🎯 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 PWA Features

- **Installable**: สามารถติดตั้งเป็น app บนเครื่อง
- **Offline**: ใช้งานได้โดยไม่ต้องเชื่อมอินเทอร์เน็ต
- **Responsive**: ทำงานได้ดีทุกขนาดหน้าจอ
- **Fast**: Load ไวด้วย caching strategy

## 🔧 Development

### การ Customize
1. **แก้ไขสี Theme**: ปรับใน `styles.css` ส่วน CSS custom properties
2. **เพิ่ม Presets**: เพิ่มใน `script.js` ในส่วน `this.presets`
3. **แก้ไขภาษา**: ปรับใน `this.translations` ใน `script.js`

### การ Build
โปรเจคนี้ไม่ต้อง build process แค่เปิดไฟล์ HTML ได้เลย

### การ Deploy
1. **GitHub Pages**: Push ไฟล์ทั้งหมดไป GitHub repository
2. **Netlify**: Drag & drop folder ไป Netlify
3. **Vercel**: Deploy ผ่าน Vercel CLI หรือ Web UI

## 🤝 Contributing

เรายินดีรับ contributions! กรุณา:

1. Fork repository
2. สร้าง feature branch (`git checkout -b feature/amazing-feature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add amazing feature'`)
4. Push ไป branch (`git push origin feature/amazing-feature`)
5. เปิด Pull Request

### Guidelines
- เขียน commit message ที่ชัดเจน
- เพิ่ม comments ในโค้ดที่ซับซ้อน
- Test ใน browser หลาย ๆ ตัว
- Follow coding style ที่มีอยู่

## 📝 Changelog

### v1.0.0 (2024-01-XX)
- ✨ เปิดตัวเวอร์ชันแรก
- 🎨 UI/UX ครบครัน
- 📱 PWA support
- 🌐 Multi-language (TH/EN)
- ♿ Accessibility features
- 💾 Export/Import/Share functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Font Awesome](https://fontawesome.com/) - Icon library
- [Loading.io Flexbox](https://loading.io/flexbox/) - Inspiration
- [CSS-Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - Reference

## 📞 Support

หากมีปัญหาหรือข้อสงสัย:

1. เปิด [GitHub Issue](https://github.com/yourusername/flexbox-generator/issues)
2. ดู [Documentation](#-การใช้งาน)
3. ติดต่อผู้พัฒนา

---

<div align="center">

**[⚡ Live Demo](https://your-demo-url.com)** | **[📱 Install PWA](https://your-demo-url.com)** | **[🐛 Report Bug](https://github.com/yourusername/flexbox-generator/issues)**

Made with ❤️ for the developer community

</div> 