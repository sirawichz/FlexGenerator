// Flexbox Generator - Main JavaScript File

class FlexboxGenerator {
    constructor() {
        this.currentConfig = {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            gap: 10,
            padding: 20,
            items: [
                { id: 1, flex: '1', alignSelf: 'auto', order: 0, text: 'Item 1' },
                { id: 2, flex: '1', alignSelf: 'auto', order: 0, text: 'Item 2' },
                { id: 3, flex: '1', alignSelf: 'auto', order: 0, text: 'Item 3' }
            ]
        };

        this.history = [];
        this.historyIndex = -1;
        this.currentTab = 'linejson';
        this.currentLang = 'th';
        this.isDarkTheme = true;
        this.selectedItem = null;
        this.viewportWidth = 320;
        this.currentContainer = 'flexbox'; // 'flexbox', 'bubble', 'carousel'
        this.editMode = false;
        this.bubbles = [];
        this.carouselData = {
            items: [],
            currentIndex: 0,
            autoSlideInterval: null,
            autoSlideTime: 0
        };

        this.translations = {
            th: {
                quickActions: 'การทำงานด่วน',
                center: 'กึ่งกลาง',
                spaceBetween: 'Space Between',
                card: 'การ์ด',
                responsive: 'Responsive',
                undo: 'ย้อนกลับ',
                redo: 'ทำซ้ำ',
                exportShare: 'Export & Share',
                flexProperties: 'คุณสมบัติ Flexbox',
                display: 'Display',
                flexDirection: 'Flex Direction',
                flexWrap: 'Flex Wrap',
                justifyContent: 'Justify Content',
                alignItems: 'Align Items',
                gap: 'Gap (px)',
                padding: 'Padding (px)',
                flexItems: 'Flex Items',
                addItem: 'เพิ่ม Item',
                removeItem: 'ลบ Item',
                preview: 'ตัวอย่าง',
                code: 'โค้ด',
                copy: 'คัดลอก',
                export: 'Export',
                import: 'Import',
                share: 'แชร์',
                documentation: 'เอกสารประกอบ',
                containerTypes: 'ประเภท Container',
                containerType: 'ประเภท Container',
                bubbleType: 'ประเภท Bubble',
                addBubble: 'เพิ่ม Bubble',
                clearBubbles: 'ลบทั้งหมด',
                carouselItems: 'จำนวน Items',
                autoSlide: 'เลื่อนอัตโนมัติ (วินาที)',
                generateCarousel: 'สร้าง Carousel',
                resetCarousel: 'รีเซ็ต',
                lineJson: 'LINE JSON',
                editMode: 'Edit',
                apply: 'Apply',
                preview: 'ตัวอย่าง'
            },
            en: {
                quickActions: 'Quick Actions',
                center: 'Center',
                spaceBetween: 'Space Between',
                card: 'Card Layout',
                responsive: 'Responsive',
                undo: 'Undo',
                redo: 'Redo',
                exportShare: 'Export & Share',
                flexProperties: 'Flexbox Properties',
                display: 'Display',
                flexDirection: 'Flex Direction',
                flexWrap: 'Flex Wrap',
                justifyContent: 'Justify Content',
                alignItems: 'Align Items',
                gap: 'Gap (px)',
                padding: 'Padding (px)',
                flexItems: 'Flex Items',
                addItem: 'Add Item',
                removeItem: 'Remove Item',
                preview: 'Preview',
                code: 'Code',
                copy: 'Copy',
                export: 'Export',
                import: 'Import',
                share: 'Share',
                documentation: 'Documentation',
                containerTypes: 'Container Types',
                containerType: 'Container Type',
                bubbleType: 'Bubble Type',
                addBubble: 'Add Bubble',
                clearBubbles: 'Clear All',
                carouselItems: 'Carousel Items',
                autoSlide: 'Auto Slide (seconds)',
                generateCarousel: 'Generate Carousel',
                resetCarousel: 'Reset',
                lineJson: 'LINE JSON',
                editMode: 'Edit',
                apply: 'Apply',
                preview: 'Preview'
            }
        };

        this.presets = {
            center: {
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            },
            spaceBetween: {
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row'
            },
            card: {
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: 16,
                padding: 24
            },
            responsive: {
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.updatePreview();
        this.updateCode();
        this.generateItemControls();
        this.loadFromLocalStorage();
        this.saveToHistory();
    }

    bindEvents() {
        // Control events
        document.getElementById('displayProp').addEventListener('change', (e) => {
            this.currentConfig.display = e.target.value;
            this.updatePreview();
            this.updateCodeWithEditMode();
            this.saveToHistory();
        });

        document.getElementById('flexDirection').addEventListener('change', (e) => {
            this.currentConfig.flexDirection = e.target.value;
            this.updatePreview();
            this.updateCodeWithEditMode();
            this.saveToHistory();
        });

        document.getElementById('flexWrap').addEventListener('change', (e) => {
            this.currentConfig.flexWrap = e.target.value;
            this.updatePreview();
            this.updateCodeWithEditMode();
            this.saveToHistory();
        });

        document.getElementById('justifyContent').addEventListener('change', (e) => {
            this.currentConfig.justifyContent = e.target.value;
            this.updatePreview();
            this.updateCodeWithEditMode();
            this.saveToHistory();
        });

        document.getElementById('alignItems').addEventListener('change', (e) => {
            this.currentConfig.alignItems = e.target.value;
            this.updatePreview();
            this.updateCodeWithEditMode();
            this.saveToHistory();
        });

        // Range inputs
        document.getElementById('gapRange').addEventListener('input', (e) => {
            this.currentConfig.gap = parseInt(e.target.value);
            document.getElementById('gapValue').textContent = `${e.target.value}px`;
            this.updatePreview();
            this.updateCodeWithEditMode();
        });

        document.getElementById('gapRange').addEventListener('change', () => {
            this.saveToHistory();
        });

        document.getElementById('paddingRange').addEventListener('input', (e) => {
            this.currentConfig.padding = parseInt(e.target.value);
            document.getElementById('paddingValue').textContent = `${e.target.value}px`;
            this.updatePreview();
            this.updateCodeWithEditMode();
        });

        document.getElementById('paddingRange').addEventListener('change', () => {
            this.saveToHistory();
        });

        // Item management
        document.getElementById('addItem').addEventListener('click', () => {
            this.addItem();
        });

        document.getElementById('removeItem').addEventListener('click', () => {
            this.removeItem();
        });

        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preset = e.currentTarget.dataset.preset;
                this.applyPreset(preset);
            });
        });

        // Undo/Redo
        document.getElementById('undoBtn').addEventListener('click', () => {
            this.undo();
        });

        document.getElementById('redoBtn').addEventListener('click', () => {
            this.redo();
        });

        // Device buttons
        document.querySelectorAll('.device-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.viewportWidth = parseInt(e.currentTarget.dataset.width);
                this.updatePreviewSize();
            });
        });

        // Code tabs
        document.querySelectorAll('.code-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // ปิดการเปลี่ยน tab เมื่ออยู่ในโหมด edit
                if (this.isEditMode) {
                    e.preventDefault();
                    this.showNotification(this.currentLang === 'th' ?
                        'ไม่สามารถเปลี่ยน Code Tab ได้ขณะอยู่ในโหมด Edit' :
                        'Cannot change Code Tab while in Edit mode', 'error');
                    return;
                }

                document.querySelectorAll('.code-tab-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.currentTab = e.currentTarget.dataset.tab;
                this.updateCode();
            });
        });

        // Copy code
        document.getElementById('copyCode').addEventListener('click', () => {
            this.copyCode();
        });

        // Toggle Edit Mode
        document.getElementById('toggleEditMode').addEventListener('click', () => {
            this.toggleEditMode();
        });

        // Apply Code
        document.getElementById('applyCode').addEventListener('click', () => {
            this.applyEditedCode();
        });

        // Code Editor keyboard shortcuts
        document.getElementById('codeEditor').addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.applyEditedCode();
            }
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = e.target.selectionStart;
                const end = e.target.selectionEnd;
                e.target.value = e.target.value.substring(0, start) + '    ' + e.target.value.substring(end);
                e.target.selectionStart = e.target.selectionEnd = start + 4;
            }
        });

        // Code Editor input changes
        document.getElementById('codeEditor').addEventListener('input', (e) => {
            const currentCode = e.target.value;
            const applyBtn = document.getElementById('applyCode');
            const codeOutput = document.getElementById('codeOutput');

            // Visual feedback for unsaved changes
            if (currentCode.trim() !== (codeOutput.textContent || '').trim()) {
                applyBtn.innerHTML = '<i class="fas fa-play mr-1"></i><span data-lang="apply">Apply</span> <span class="text-xs opacity-75">(Ctrl+Enter)</span>';
                applyBtn.classList.add('animate-pulse', 'bg-orange-600', 'hover:bg-orange-700');
                applyBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
            } else {
                applyBtn.innerHTML = '<i class="fas fa-play mr-1"></i><span data-lang="apply">Apply</span>';
                applyBtn.classList.remove('animate-pulse', 'bg-orange-600', 'hover:bg-orange-700');
                applyBtn.classList.add('bg-green-600', 'hover:bg-green-700');
            }

            // Update language for the button
            this.updateLanguage();
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Language switch
        document.getElementById('langSwitch').addEventListener('change', (e) => {
            this.currentLang = e.target.value;
            this.updateLanguage();
        });

        // Export/Import
        document.getElementById('toggleExport').addEventListener('click', () => {
            const panel = document.getElementById('exportPanel');
            panel.classList.toggle('hidden');
        });

        document.getElementById('exportConfig').addEventListener('click', () => {
            this.exportConfig();
        });

        document.getElementById('importConfig').addEventListener('click', () => {
            this.importConfig();
        });

        document.getElementById('shareConfig').addEventListener('click', () => {
            this.shareConfig();
        });

        // Help button
        document.getElementById('helpBtn').addEventListener('click', () => {
            this.showDocumentation();
        });

        // Container Type switching
        document.getElementById('containerType').addEventListener('change', (e) => {
            this.switchContainer(e.target.value);
        });

        // Bubble controls
        document.getElementById('addBubble').addEventListener('click', () => {
            this.addBubble();
        });

        document.getElementById('clearBubbles').addEventListener('click', () => {
            this.clearBubbles();
        });

        // Carousel controls
        document.getElementById('generateCarousel').addEventListener('click', () => {
            this.generateCarousel();
        });

        document.getElementById('resetCarousel').addEventListener('click', () => {
            this.resetCarousel();
        });

        document.getElementById('carouselItemCount').addEventListener('change', (e) => {
            this.carouselData.itemCount = parseInt(e.target.value);
        });

        document.getElementById('autoSlideTime').addEventListener('change', (e) => {
            this.carouselData.autoSlideTime = parseInt(e.target.value);
            this.updateCarouselAutoSlide();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'z':
                        e.preventDefault();
                        if (e.shiftKey) {
                            this.redo();
                        } else {
                            this.undo();
                        }
                        break;
                    case 'c':
                        if (e.target.matches('#codeOutput, #codeOutput *')) {
                            // Allow normal copy behavior for code
                            return;
                        }
                        break;
                }
            }
        });
    }

    updatePreview() {
        const container = document.getElementById('flexContainer');
        const config = this.currentConfig;

        console.log('DEBUG: updatePreview() called with', config.items.length, 'items');

        // Apply container styles
        container.style.display = config.display;
        container.style.flexDirection = config.flexDirection;
        container.style.flexWrap = config.flexWrap;
        container.style.justifyContent = config.justifyContent;
        container.style.alignItems = config.alignItems;
        container.style.gap = `${config.gap}px`;
        container.style.padding = `${config.padding}px`;

        // Update items
        container.innerHTML = '';
        console.log('DEBUG: Creating', config.items.length, 'DOM elements');
        config.items.forEach((item, index) => {
            console.log(`DEBUG: Creating DOM element for item ${item.id}:`, item);
            const itemEl = document.createElement('div');

            // Set proper class names
            let itemClass = 'flex-item';
            if (item.flex !== '1' || item.alignSelf !== 'auto' || item.order !== 0) {
                itemClass += ` flex-item-${item.id}`;
            }

            itemEl.className = itemClass;
            itemEl.dataset.item = item.id;
            itemEl.textContent = item.text || `Item ${item.id}`; // แสดงข้อความจาก LINE JSON หรือ default

            // Apply item-specific styles only if they differ from defaults
            if (item.flex !== '1') {
                itemEl.style.flex = item.flex;
            }
            if (item.alignSelf !== 'auto') {
                itemEl.style.alignSelf = item.alignSelf;
            }
            if (item.order !== 0) {
                itemEl.style.order = item.order;
            }

            // Add click handler for selection
            itemEl.addEventListener('click', () => {
                this.selectItem(item.id);
            });

            container.appendChild(itemEl);
        });

        console.log('DEBUG: updatePreview() completed. DOM has', container.children.length, 'elements');

        this.saveToLocalStorage();
    }

    updatePreviewSize() {
        const container = document.getElementById('flexContainer');
        container.style.maxWidth = `${this.viewportWidth}px`;
        container.style.margin = '0 auto';

        // Re-render carousel if current container is carousel
        if (this.currentContainer === 'carousel' && this.carouselData.items.length > 0) {
            this.renderCarouselPreview();
        }
    }

    updateCode() {
        // Don't update code in edit mode to preserve user's edited code
        if (this.editMode) {
            console.log('Edit mode: Skipping updateCode() to preserve user edited code');
            return;
        }

        const output = document.getElementById('codeOutput');
        let code = '';
        let language = 'json';

        // Only generate LINE JSON
        code = this.generateLINEJSON();

        // Handle empty code for bubble container with no bubbles
        if (code === '' && this.currentContainer === 'bubble') {
            output.innerHTML = `<div class="text-center text-gray-400 py-8">
                <i class="fas fa-code text-3xl mb-3 text-gray-500"></i>
                <p>ไม่มีโค้ด LINE JSON</p>
                <p class="text-sm">เพิ่ม Bubble เพื่อดูโค้ด</p>
            </div>`;
        } else {
            output.innerHTML = `<code class="language-${language}">${this.escapeHtml(code)}</code>`;
        }
    }

    updateCodeInEditMode() {
        // Force update code in editor even when in edit mode (for Quick Actions)
        console.log('Force updating code in edit mode for Quick Actions');
        
        const codeEditor = document.getElementById('codeEditor');
        const codeOutput = document.getElementById('codeOutput');
        
        if (!codeEditor || !codeOutput) {
            console.warn('Code editor or output not found');
            return;
        }

        // Generate new LINE JSON based on current config
        let newCode = '';
        let language = 'json';

        // Only generate LINE JSON 
        newCode = this.generateLINEJSON();

        // Update both editor and output
        codeEditor.value = newCode;
        
        // Handle empty code for bubble container with no bubbles
        if (newCode === '' && this.currentContainer === 'bubble') {
            codeOutput.innerHTML = `<div class="text-center text-gray-400 py-8">
                <i class="fas fa-code text-3xl mb-3 text-gray-500"></i>
                <p>ไม่มีโค้ด LINE JSON</p>
                <p class="text-sm">เพิ่ม Bubble เพื่อดูโค้ด</p>
            </div>`;
        } else {
            codeOutput.innerHTML = `<code class="language-${language}">${this.escapeHtml(newCode)}</code>`;
            
            // Apply syntax highlighting if available
            if (window.Prism) {
                window.Prism.highlightElement(codeOutput.querySelector('code'));
            }
        }

        console.log('Code updated in edit mode:', {
            editMode: this.editMode,
            codeLength: newCode.length,
            currentContainer: this.currentContainer
        });
    }

    updateCodeWithEditMode() {
        // Smart update code that works in both normal and edit mode
        if (this.editMode) {
            this.updateCodeInEditMode();
        } else {
            this.updateCode();
        }
    }

    generateLINEJSON() {
        if (this.currentContainer === 'bubble') {
            return this.generateBubbleLINEJSON();
        } else if (this.currentContainer === 'carousel') {
            return this.generateCarouselLINEJSON();
        }

        // Default: Bubble container with flexbox layout
        return this.generateFlexboxLINEJSON();
    }

    generateFlexboxLINEJSON() {
        const config = this.currentConfig;

        // Convert flexbox properties to LINE Flex Message structure
        const flexMessage = {
            type: "flex",
            altText: "Flexbox Layout Message",
            contents: {
                type: "bubble",
                body: {
                    type: "box",
                    layout: config.flexDirection === 'column' ? "vertical" : "horizontal",
                    spacing: this.convertGapToSpacing(config.gap),
                    contents: []
                }
            }
        };

        // Add items as text components
        config.items.forEach((item, index) => {
            const textComponent = {
                type: "text",
                text: item.text || `Item ${item.id}`, // ใช้ข้อความจาก item.text
                flex: parseInt(item.flex) || 1,
                align: "center",
                gravity: "center",
                color: "#10b981",
                weight: "bold"
            };

            if (item.alignSelf !== 'auto') {
                textComponent.gravity = this.convertAlignSelf(item.alignSelf);
            }

            flexMessage.contents.body.contents.push(textComponent);
        });

        // Add padding using box wrapper if needed
        if (config.padding > 0) {
            flexMessage.contents.body.paddingAll = `${config.padding}px`;
        }

        return JSON.stringify(flexMessage, null, 2);
    }

    generateBubbleLINEJSON() {
        if (this.bubbles.length === 0) {
            // Return empty string when no bubbles - don't show any code
            return '';
        }

        // Generate single bubble or multiple bubbles
        if (this.bubbles.length === 1) {
            return this.generateSingleBubbleLINEJSON(this.bubbles[0]);
        } else {
            return this.generateMultipleBubblesLINEJSON();
        }
    }

    generateSingleBubbleLINEJSON(bubble) {
        const flexMessage = {
            type: "flex",
            altText: bubble.text || "Bubble message",
            contents: this.createBubbleLINEStructure(bubble)
        };

        return JSON.stringify(flexMessage, null, 2);
    }

    generateMultipleBubblesLINEJSON() {
        const flexMessage = {
            type: "flex",
            altText: "Multiple bubble messages",
            contents: {
                type: "carousel",
                contents: this.bubbles.map(bubble => this.createBubbleLINEStructure(bubble))
            }
        };

        return JSON.stringify(flexMessage, null, 2);
    }

    createBubbleLINEStructure(bubble) {
        const bubbleStructure = {
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                spacing: "md",
                contents: []
            }
        };

        // Add header if it's a card type
        if (bubble.type === 'card' && bubble.header) {
            bubbleStructure.header = {
                type: "box",
                layout: "vertical",
                contents: [{
                    type: "text",
                    text: bubble.header,
                    weight: "bold",
                    size: "lg",
                    color: "#10b981"
                }]
            };
        }

        // Check if bubble has groups (array of content groups)
        if (bubble.groups && Array.isArray(bubble.groups)) {
            // Handle grouped content structure
            bubble.groups.forEach((group, groupIndex) => {
                if (groupIndex > 0) {
                    // Add separator between groups
                    bubbleStructure.body.contents.push({
                        type: "separator",
                        margin: "md",
                        color: "#E5E7EB"
                    });
                }

                // Add group container
                const groupBox = {
                    type: "box",
                    layout: "vertical",
                    spacing: "sm",
                    contents: []
                };

                // Add group items
                if (group.items && Array.isArray(group.items)) {
                    group.items.forEach(item => {
                        if (item.type === 'text') {
                            groupBox.contents.push({
                                type: "text",
                                text: item.text || "Sample text",
                                wrap: true,
                                size: item.size || "md",
                                color: item.color || "#374151",
                                weight: item.weight || "regular",
                                align: item.align || "start"
                            });
                        } else if (item.type === 'button') {
                            groupBox.contents.push({
                                type: "button",
                                style: item.style || "secondary",
                                height: "sm",
                                action: {
                                    type: "message",
                                    label: item.label || "Button",
                                    text: item.text || "Button clicked"
                                }
                            });
                        }
                    });
                }

                // Add group title if exists
                if (group.title) {
                    bubbleStructure.body.contents.push({
                        type: "text",
                        text: group.title,
                        weight: "bold",
                        size: "sm",
                        color: "#6B7280",
                        margin: "sm"
                    });
                }

                bubbleStructure.body.contents.push(groupBox);
            });
        } else {
            // Handle simple content structure (existing behavior)
            // Add main text
            bubbleStructure.body.contents.push({
                type: "text",
                text: bubble.text || "Sample message",
                wrap: true,
                size: "md",
                color: bubble.type === 'sender' ? "#ffffff" : "#374151"
            });

            // Add additional text items if exists
            if (bubble.additionalTexts && Array.isArray(bubble.additionalTexts)) {
                // Add separator before additional texts
                bubbleStructure.body.contents.push({
                    type: "separator",
                    margin: "md",
                    color: "#E5E7EB"
                });

                bubble.additionalTexts.forEach(textItem => {
                    bubbleStructure.body.contents.push({
                        type: "text",
                        text: textItem.text || "Additional text",
                        wrap: true,
                        size: textItem.size || "sm",
                        color: textItem.color || "#6B7280",
                        weight: textItem.weight || "regular"
                    });
                });
            }

            // Add timestamp for chat bubbles
            if (['sender', 'receiver'].includes(bubble.type)) {
                bubbleStructure.body.contents.push({
                    type: "text",
                    text: new Date().toLocaleTimeString('th-TH', {
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    size: "xs",
                    color: "#9CA3AF",
                    align: bubble.type === 'sender' ? "end" : "start",
                    margin: "sm"
                });
            }
        }

        // Add actions for card type
        if (bubble.type === 'card') {
            bubbleStructure.footer = {
                type: "box",
                layout: "horizontal",
                spacing: "sm",
                contents: [
                    {
                        type: "button",
                        style: "primary",
                        height: "sm",
                        action: {
                            type: "message",
                            label: "Action 1",
                            text: "Action 1 clicked"
                        }
                    },
                    {
                        type: "button",
                        style: "secondary",
                        height: "sm",
                        action: {
                            type: "message",
                            label: "Action 2",
                            text: "Action 2 clicked"
                        }
                    }
                ]
            };
        }

        // Add styling based on bubble type
        if (bubble.type === 'sender') {
            bubbleStructure.styles = {
                body: {
                    backgroundColor: "#10b981"
                }
            };
        } else if (bubble.type === 'receiver') {
            bubbleStructure.styles = {
                body: {
                    backgroundColor: "#374151"
                }
            };
        } else if (bubble.type === 'card') {
            bubbleStructure.styles = {
                body: {
                    backgroundColor: "#1F2937"
                }
            };
        } else if (bubble.type === 'grouped') {
            bubbleStructure.styles = {
                body: {
                    backgroundColor: "#1F2937"
                }
            };
        }

        return bubbleStructure;
    }

    generateCarouselLINEJSON() {
        if (this.carouselData.items.length === 0) {
            return JSON.stringify({
                type: "flex",
                altText: "Empty carousel",
                contents: {
                    type: "bubble",
                    body: {
                        type: "box",
                        layout: "vertical",
                        contents: [{
                            type: "text",
                            text: "No carousel items generated yet",
                            align: "center",
                            color: "#666666"
                        }]
                    }
                }
            }, null, 2);
        }

        const flexMessage = {
            type: "flex",
            altText: "Carousel message",
            contents: {
                type: "carousel",
                contents: this.carouselData.items.map((item, index) => ({
                    type: "bubble",
                    hero: {
                        type: "box",
                        layout: "vertical",
                        contents: [{
                            type: "text",
                            text: item.title,
                            align: "center",
                            weight: "bold",
                            size: "xl",
                            color: "#ffffff"
                        }],
                        backgroundColor: "#10b981",
                        paddingAll: "xl",
                        paddingTop: "xxl",
                        paddingBottom: "xxl"
                    },
                    body: {
                        type: "box",
                        layout: "vertical",
                        spacing: "md",
                        contents: [
                            {
                                type: "text",
                                text: item.title,
                                weight: "bold",
                                size: "lg",
                                color: "#10b981"
                            },
                            {
                                type: "text",
                                text: item.description || `This is carousel item ${index + 1} with sample content.`,
                                wrap: true,
                                size: "sm",
                                color: "#666666",
                                margin: "md"
                            }
                        ]
                    },
                    footer: {
                        type: "box",
                        layout: "vertical",
                        contents: [{
                            type: "button",
                            style: "primary",
                            color: "#10b981",
                            action: {
                                type: "message",
                                label: item.action || "Select",
                                text: `Selected: ${item.title}`
                            }
                        }]
                    }
                }))
            }
        };

        return JSON.stringify(flexMessage, null, 2);
    }

    convertGapToSpacing(gap) {
        if (gap <= 5) return "xs";
        if (gap <= 10) return "sm";
        if (gap <= 15) return "md";
        if (gap <= 25) return "lg";
        if (gap <= 35) return "xl";
        return "xxl";
    }

    convertSpacingToGap(spacing) {
        const spacingMap = {
            'xs': 5,
            'sm': 10,
            'md': 15,
            'lg': 25,
            'xl': 35,
            'xxl': 45
        };
        return spacingMap[spacing] || 10; // default to 10px if not found
    }

    convertAlignSelf(alignSelf) {
        const alignMap = {
            'flex-start': 'top',
            'flex-end': 'bottom',
            'center': 'center'
        };
        return alignMap[alignSelf] || 'center';
    }













    addItem() {
        const newId = Math.max(...this.currentConfig.items.map(i => i.id)) + 1;
        this.currentConfig.items.push({
            id: newId,
            flex: '1',
            alignSelf: 'auto',
            order: 0,
            text: `Item ${newId}`
        });

        this.updatePreview();
        this.updateCodeWithEditMode();
        this.generateItemControls();
        this.saveToHistory();
    }

    removeItem() {
        if (this.currentConfig.items.length > 1) {
            this.currentConfig.items.pop();
            this.updatePreview();
            this.updateCodeWithEditMode();
            this.generateItemControls();
            this.saveToHistory();
        }
    }

    selectItem(itemId) {
        // Remove previous selection
        document.querySelectorAll('.flex-item').forEach(el => {
            el.classList.remove('selected');
        });

        // Add selection to clicked item
        const itemEl = document.querySelector(`[data-item="${itemId}"]`);
        if (itemEl) {
            itemEl.classList.add('selected');
            this.selectedItem = itemId;
            this.highlightItemControl(itemId);
        }
    }

    highlightItemControl(itemId) {
        document.querySelectorAll('.item-control').forEach(el => {
            el.classList.remove('active');
        });

        const control = document.querySelector(`[data-item-control="${itemId}"]`);
        if (control) {
            control.classList.add('active');
        }
    }

    generateItemControls() {
        const container = document.getElementById('itemControls');
        container.innerHTML = '';

        console.log('DEBUG: generateItemControls() called with', this.currentConfig.items.length, 'items');

        this.currentConfig.items.forEach(item => {
            const control = document.createElement('div');
            control.className = 'item-control';
            control.dataset.itemControl = item.id;

            control.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-green-400">Item ${item.id}</span>
                    <button class="text-xs text-gray-400 hover:text-white" onclick="flexGenerator.selectItem(${item.id})">
                        <i class="fas fa-crosshairs"></i>
                    </button>
                </div>
                
                <div class="space-y-2">
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Text</label>
                        <input type="text" value="${item.text || 'Item ' + item.id}" 
                               class="w-full bg-gray-700 border border-green-700 rounded px-2 py-1 text-xs"
                               onchange="flexGenerator.updateItemProperty(${item.id}, 'text', this.value)">
                    </div>
                    
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Flex</label>
                        <input type="text" value="${item.flex}" 
                               class="w-full bg-gray-700 border border-green-700 rounded px-2 py-1 text-xs"
                               onchange="flexGenerator.updateItemProperty(${item.id}, 'flex', this.value)">
                    </div>
                    
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Align Self</label>
                        <select class="w-full bg-gray-700 border border-green-700 rounded px-2 py-1 text-xs"
                                onchange="flexGenerator.updateItemProperty(${item.id}, 'alignSelf', this.value)">
                            <option value="auto" ${item.alignSelf === 'auto' ? 'selected' : ''}>auto</option>
                            <option value="flex-start" ${item.alignSelf === 'flex-start' ? 'selected' : ''}>flex-start</option>
                            <option value="flex-end" ${item.alignSelf === 'flex-end' ? 'selected' : ''}>flex-end</option>
                            <option value="center" ${item.alignSelf === 'center' ? 'selected' : ''}>center</option>
                            <option value="stretch" ${item.alignSelf === 'stretch' ? 'selected' : ''}>stretch</option>
                            <option value="baseline" ${item.alignSelf === 'baseline' ? 'selected' : ''}>baseline</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Order</label>
                        <input type="number" value="${item.order}" min="-10" max="10"
                               class="w-full bg-gray-700 border border-green-700 rounded px-2 py-1 text-xs"
                               onchange="flexGenerator.updateItemProperty(${item.id}, 'order', parseInt(this.value))">
                    </div>
                </div>
            `;

            container.appendChild(control);
        });
    }

    updateItemProperty(itemId, property, value) {
        const item = this.currentConfig.items.find(i => i.id === itemId);
        if (item) {
            item[property] = value;
            this.updatePreview();
            this.updateCodeWithEditMode();
            this.saveToHistory();
        }
    }

    applyPreset(presetName) {
        const preset = this.presets[presetName];
        if (preset) {
            Object.assign(this.currentConfig, preset);
            this.updateControls();
            this.updatePreview();
            
            // Special handling for edit mode - update LINE JSON code in editor
            if (this.editMode) {
                this.updateCodeInEditMode();
                
                // Get preset display name
                const presetNames = {
                    'center': { th: 'กึ่งกลาง', en: 'Center' },
                    'spaceBetween': { th: 'Space Between', en: 'Space Between' },
                    'card': { th: 'การ์ด', en: 'Card Layout' },
                    'responsive': { th: 'Responsive', en: 'Responsive' }
                };
                
                const displayName = presetNames[presetName] ? 
                    presetNames[presetName][this.currentLang] : presetName;
                
                this.showNotification(this.currentLang === 'th' ?
                    `ใช้การตั้งค่าด่วน "${displayName}" แล้ว - อัปเดตโค้ด LINE JSON` :
                    `Applied "${displayName}" preset - LINE JSON code updated`, 'success');
            } else {
                this.updateCode();
            }
            
            this.saveToHistory();
        }
    }

    updateControls() {
        const config = this.currentConfig;
        document.getElementById('displayProp').value = config.display;
        document.getElementById('flexDirection').value = config.flexDirection;
        document.getElementById('flexWrap').value = config.flexWrap;
        document.getElementById('justifyContent').value = config.justifyContent;
        document.getElementById('alignItems').value = config.alignItems;
        document.getElementById('gapRange').value = config.gap;
        document.getElementById('paddingRange').value = config.padding;
        document.getElementById('gapValue').textContent = `${config.gap}px`;
        document.getElementById('paddingValue').textContent = `${config.padding}px`;
    }

    saveToHistory() {
        // Remove any future history if we're not at the end
        this.history = this.history.slice(0, this.historyIndex + 1);

        // Add new state
        this.history.push(JSON.parse(JSON.stringify(this.currentConfig)));
        this.historyIndex = this.history.length - 1;

        // Limit history size
        if (this.history.length > 50) {
            this.history.shift();
            this.historyIndex--;
        }

        this.updateHistoryButtons();
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.currentConfig = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
            this.updateControls();
            this.updatePreview();
            this.updateCodeWithEditMode();
            this.generateItemControls();
            this.updateHistoryButtons();
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.currentConfig = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
            this.updateControls();
            this.updatePreview();
            this.updateCodeWithEditMode();
            this.generateItemControls();
            this.updateHistoryButtons();
        }
    }

    updateHistoryButtons() {
        document.getElementById('undoBtn').disabled = this.historyIndex <= 0;
        document.getElementById('redoBtn').disabled = this.historyIndex >= this.history.length - 1;
    }

    copyCode() {
        const code = document.getElementById('codeOutput').textContent;
        navigator.clipboard.writeText(code).then(() => {
            this.showNotification('Code copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('Failed to copy code', 'error');
        });
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        document.body.classList.toggle('light-theme', !this.isDarkTheme);

        const icon = document.querySelector('#themeToggle i');
        icon.className = this.isDarkTheme ? 'fas fa-moon text-green-400' : 'fas fa-sun text-green-400';

        localStorage.setItem('flexbox-generator-theme', this.isDarkTheme ? 'dark' : 'light');
    }

    updateLanguage() {
        const translations = this.translations[this.currentLang];

        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.dataset.lang;
            if (translations[key]) {
                el.textContent = translations[key];
            }
        });

        localStorage.setItem('flexbox-generator-lang', this.currentLang);
    }

    exportConfig() {
        const config = {
            version: '1.0',
            timestamp: new Date().toISOString(),
            config: this.currentConfig
        };

        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `flexbox-config-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
        this.showNotification('Configuration exported!', 'success');
    }

    importConfig() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const imported = JSON.parse(e.target.result);
                        if (imported.config) {
                            this.currentConfig = imported.config;
                            this.updateControls();
                            this.updatePreview();
                            this.updateCodeWithEditMode();
                            this.generateItemControls();
                            this.saveToHistory();
                            this.showNotification('Configuration imported!', 'success');
                        }
                    } catch (error) {
                        this.showNotification('Invalid configuration file', 'error');
                    }
                };
                reader.readAsText(file);
            }
        };

        input.click();
    }

    shareConfig() {
        const config = btoa(JSON.stringify(this.currentConfig));
        const url = `${window.location.origin}${window.location.pathname}?config=${config}`;

        navigator.clipboard.writeText(url).then(() => {
            this.showNotification('Share URL copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('Failed to copy share URL', 'error');
        });
    }

    loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        const configParam = params.get('config');

        if (configParam) {
            try {
                const config = JSON.parse(atob(configParam));
                this.currentConfig = config;
                this.updateControls();
                this.updatePreview();
                this.updateCodeWithEditMode();
                this.generateItemControls();
                this.saveToHistory();
            } catch (error) {
                console.error('Failed to load config from URL:', error);
            }
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('flexbox-generator-config', JSON.stringify(this.currentConfig));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('flexbox-generator-config');
        if (saved) {
            try {
                this.currentConfig = JSON.parse(saved);
                this.updateControls();
            } catch (error) {
                console.error('Failed to load from localStorage:', error);
            }
        }

        // Load theme preference
        const theme = localStorage.getItem('flexbox-generator-theme');
        if (theme === 'light') {
            this.isDarkTheme = false;
            document.body.classList.add('light-theme');
            const icon = document.querySelector('#themeToggle i');
            if (icon) {
                icon.className = 'fas fa-sun text-green-400';
            }
        }

        // Load language preference
        const lang = localStorage.getItem('flexbox-generator-lang');
        if (lang && this.translations[lang]) {
            this.currentLang = lang;
            document.getElementById('langSwitch').value = lang;
            this.updateLanguage();
        }

        // Load from URL if present
        this.loadFromURL();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg text-white z-50 transition-all duration-300 ${type === 'success' ? 'bg-green-600' :
                type === 'error' ? 'bg-red-600' : 'bg-blue-600'
            }`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showDocumentation() {
        const modal = document.getElementById('docModal');
        const modalContent = modal.querySelector('.prose');

        const documentationHTML = this.getDocumentationContent();
        modalContent.innerHTML = documentationHTML;

        modal.classList.remove('hidden');

        // Close modal functionality
        const closeBtn = document.getElementById('closeModal');
        const closeModal = () => {
            modal.classList.add('hidden');
        };

        closeBtn.onclick = closeModal;
        modal.onclick = (e) => {
            if (e.target === modal) closeModal();
        };

        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }

    getDocumentationContent() {
        const lang = this.currentLang;

        if (lang === 'th') {
            return `
                <h3 class="text-xl font-bold text-green-400 mb-4">🚀 คู่มือการใช้งาน FlexGenerator</h3>
                
                <div class="space-y-6">
                    <section>
                        <h4 class="text-lg font-semibold text-green-300 mb-3">📦 ประเภท Container</h4>
                        <ul class="list-disc list-inside space-y-2 text-gray-300">
                            <li><strong>Flexbox:</strong> สร้าง layout ด้วย CSS Flexbox</li>
                            <li><strong>Bubble:</strong> สร้าง chat bubbles แบบ LINE Flex Message</li>
                            <li><strong>Carousel:</strong> สร้าง carousel แบบเลื่อนได้</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h4 class="text-lg font-semibold text-green-300 mb-3">⚡ การทำงานด่วน</h4>
                        <ul class="list-disc list-inside space-y-2 text-gray-300">
                            <li><strong>กึ่งกลาง:</strong> จัดวางรายการตรงกลาง</li>
                            <li><strong>Space Between:</strong> กระจายรายการให้ห่างเท่าๆ กัน</li>
                            <li><strong>การ์ด:</strong> Layout แบบการ์ดเรียงแนวชิง</li>
                            <li><strong>Responsive:</strong> Layout ที่ปรับตัวได้</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h4 class="text-lg font-semibold text-green-300 mb-3">✏️ Edit Mode - ฟีเจอร์ใหม่!</h4>
                        <div class="bg-gray-800 p-4 rounded-lg border border-green-600">
                            <h5 class="font-semibold text-green-400 mb-2">🎯 วิธีใช้งาน:</h5>
                            <ol class="list-decimal list-inside space-y-2 text-gray-300">
                                <li>กดปุ่ม <span class="bg-purple-600 px-2 py-1 rounded text-sm">"Edit"</span> ข้างๆ Code Tabs</li>
                                <li>แก้ไขโค้ด CSS หรือ HTML ในตัวแก้ไข</li>
                                <li>กดปุ่ม <span class="bg-blue-600 px-2 py-1 rounded text-sm">"Apply"</span> หรือ <kbd class="bg-gray-700 px-2 py-1 rounded text-xs">Ctrl+Enter</kbd></li>
                                <li>ดูผลลัพธ์ทันทีใน Preview</li>
                                <li>กดปุ่ม <span class="bg-orange-600 px-2 py-1 rounded text-sm">"Preview"</span> เพื่อกลับสู่โหมดปกติ</li>
                            </ol>
                            
                            <h5 class="font-semibold text-green-400 mb-2 mt-4">⌨️ Keyboard Shortcuts:</h5>
                            <ul class="list-disc list-inside space-y-1 text-gray-300">
                                <li><kbd class="bg-gray-700 px-2 py-1 rounded text-xs">Ctrl+Enter</kbd> - Apply Code</li>
                                <li><kbd class="bg-gray-700 px-2 py-1 rounded text-xs">Tab</kbd> - เพิ่ม 2 spaces (indent)</li>
                            </ul>
                            
                            <h5 class="font-semibold text-green-400 mb-2 mt-4">💡 ตัวอย่างการแก้ไข:</h5>
                            <div class="bg-gray-900 p-3 rounded text-sm text-gray-300">
                                <strong>CSS Mode:</strong><br>
                                <code class="text-green-300">.flex-container { display: grid; grid-template-columns: repeat(3, 1fr); }</code><br><br>
                                <strong>HTML Mode:</strong><br>
                                <code class="text-blue-300">&lt;div class="flex-item"&gt;Custom Item&lt;/div&gt;</code>
                            </div>
                        </div>
                    </section>
                    
                    <section>
                        <h4 class="text-lg font-semibold text-green-300 mb-3">📱 Responsive Preview</h4>
                        <ul class="list-disc list-inside space-y-2 text-gray-300">
                            <li><strong>Mobile:</strong> 320px width</li>
                            <li><strong>Tablet:</strong> 768px width</li>
                            <li><strong>Desktop:</strong> 1024px width</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h4 class="text-lg font-semibold text-green-300 mb-3">💾 Export & Share</h4>
                        <ul class="list-disc list-inside space-y-2 text-gray-300">
                            <li><strong>Export:</strong> ส่งออกการตั้งค่าเป็นไฟล์ JSON</li>
                            <li><strong>Import:</strong> นำเข้าการตั้งค่าจากไฟล์ JSON</li>
                            <li><strong>Share:</strong> สร้าง URL ลิงก์สำหรับแชร์</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h4 class="text-lg font-semibold text-green-300 mb-3">⌨️ Keyboard Shortcuts</h4>
                        <ul class="list-disc list-inside space-y-2 text-gray-300">
                            <li><kbd class="bg-gray-700 px-2 py-1 rounded text-xs">Ctrl+Z</kbd> - Undo</li>
                            <li><kbd class="bg-gray-700 px-2 py-1 rounded text-xs">Ctrl+Shift+Z</kbd> - Redo</li>
                            <li><kbd class="bg-gray-700 px-2 py-1 rounded text-xs">Ctrl+C</kbd> - Copy Code (เมื่ออยู่ใน Code Output)</li>
                        </ul>
                    </section>
                </div>
            `;
        } else {
            return `
                <h3 class="text-xl font-bold text-green-400 mb-4">🚀 FlexGenerator User Guide</h3>
                
                <div class="space-y-6">
                    <section>
                        <h4 class="text-lg font-semibold text-green-300 mb-3">📦 Container Types</h4>
                        <ul class="list-disc list-inside space-y-2 text-gray-300">
                            <li><strong>Flexbox:</strong> Create layouts with CSS Flexbox</li>
                            <li><strong>Bubble:</strong> Create chat bubbles for LINE Flex Messages</li>
                            <li><strong>Carousel:</strong> Create scrollable carousels</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h4 class="text-lg font-semibold text-green-300 mb-3">⚡ Quick Actions</h4>
                        <ul class="list-disc list-inside space-y-2 text-gray-300">
                            <li><strong>Center:</strong> Center items horizontally and vertically</li>
                            <li><strong>Space Between:</strong> Distribute items with equal spacing</li>
                            <li><strong>Card:</strong> Vertical card layout</li>
                            <li><strong>Responsive:</strong> Adaptive layout</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h4 class="text-lg font-semibold text-green-300 mb-3">✏️ Edit Mode - New Feature!</h4>
                        <div class="bg-gray-800 p-4 rounded-lg border border-green-600">
                            <h5 class="font-semibold text-green-400 mb-2">🎯 How to Use:</h5>
                            <ol class="list-decimal list-inside space-y-2 text-gray-300">
                                <li>Click <span class="bg-purple-600 px-2 py-1 rounded text-sm">"Edit"</span> button next to Code Tabs</li>
                                <li>Edit CSS or HTML code in the editor</li>
                                <li>Click <span class="bg-blue-600 px-2 py-1 rounded text-sm">"Apply"</span> button or press <kbd class="bg-gray-700 px-2 py-1 rounded text-xs">Ctrl+Enter</kbd></li>
                                <li>See results instantly in Preview</li>
                                <li>Click <span class="bg-orange-600 px-2 py-1 rounded text-sm">"Preview"</span> to return to normal mode</li>
                            </ol>
                            
                            <h5 class="font-semibold text-green-400 mb-2 mt-4">⌨️ Keyboard Shortcuts:</h5>
                            <ul class="list-disc list-inside space-y-1 text-gray-300">
                                <li><kbd class="bg-gray-700 px-2 py-1 rounded text-xs">Ctrl+Enter</kbd> - Apply Code</li>
                                <li><kbd class="bg-gray-700 px-2 py-1 rounded text-xs">Tab</kbd> - Add 2 spaces (indent)</li>
                            </ul>
                            
                            <h5 class="font-semibold text-green-400 mb-2 mt-4">💡 Edit Examples:</h5>
                            <div class="bg-gray-900 p-3 rounded text-sm text-gray-300">
                                <strong>CSS Mode:</strong><br>
                                <code class="text-green-300">.flex-container { display: grid; grid-template-columns: repeat(3, 1fr); }</code><br><br>
                                <strong>HTML Mode:</strong><br>
                                <code class="text-blue-300">&lt;div class="flex-item"&gt;Custom Item&lt;/div&gt;</code>
                            </div>
                        </div>
                    </section>
                    
                    <section>
                        <h4 class="text-lg font-semibold text-green-300 mb-3">📱 Responsive Preview</h4>
                        <ul class="list-disc list-inside space-y-2 text-gray-300">
                            <li><strong>Mobile:</strong> 320px width</li>
                            <li><strong>Tablet:</strong> 768px width</li>
                            <li><strong>Desktop:</strong> 1024px width</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h4 class="text-lg font-semibold text-green-300 mb-3">💾 Export & Share</h4>
                        <ul class="list-disc list-inside space-y-2 text-gray-300">
                            <li><strong>Export:</strong> Export configuration as JSON file</li>
                            <li><strong>Import:</strong> Import configuration from JSON file</li>
                            <li><strong>Share:</strong> Generate shareable URL</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h4 class="text-lg font-semibold text-green-300 mb-3">⌨️ Keyboard Shortcuts</h4>
                        <ul class="list-disc list-inside space-y-2 text-gray-300">
                            <li><kbd class="bg-gray-700 px-2 py-1 rounded text-xs">Ctrl+Z</kbd> - Undo</li>
                            <li><kbd class="bg-gray-700 px-2 py-1 rounded text-xs">Ctrl+Shift+Z</kbd> - Redo</li>
                            <li><kbd class="bg-gray-700 px-2 py-1 rounded text-xs">Ctrl+C</kbd> - Copy Code (when in Code Output)</li>
                        </ul>
                    </section>
                </div>
            `;
        }
    }

    switchContainer(type) {
        // Check if currently in edit mode
        if (this.editMode) {
            // Show notification and auto-exit edit mode
            this.showNotification(this.currentLang === 'th' ?
                'ออกจากโหมด Edit เพื่อเปลี่ยนประเภท Container' :
                'Exiting Edit mode to change Container type', 'info');
            
            // Exit edit mode first
            this.toggleEditMode();
            
            // Brief delay to ensure UI updates properly
            setTimeout(() => {
                this.performContainerSwitch(type);
            }, 100);
            return;
        }

        this.performContainerSwitch(type);
    }

    performContainerSwitch(type) {
        this.currentContainer = type;

        // Hide all container controls
        document.getElementById('bubbleControls').classList.add('hidden');
        document.getElementById('carouselControls').classList.add('hidden');

        // Get all sections that should be hidden when not using flexbox
        const quickActionsSection = document.querySelector('section:has(.preset-btn)');
        const flexPropertiesSection = document.querySelector('section:has(#displayProp)');
        const flexItemsSection = document.querySelector('section:has(#addItem)');

        // Show/hide flexbox-specific sections and controls
        if (type === 'flexbox') {
            // Show flexbox sections
            if (quickActionsSection) quickActionsSection.style.display = 'block';
            if (flexPropertiesSection) flexPropertiesSection.style.display = 'block';
            if (flexItemsSection) flexItemsSection.style.display = 'block';
        } else {
            // Hide flexbox sections
            if (quickActionsSection) quickActionsSection.style.display = 'none';
            if (flexPropertiesSection) flexPropertiesSection.style.display = 'none';
            if (flexItemsSection) flexItemsSection.style.display = 'none';
        }

        // Show specific controls
        if (type === 'bubble') {
            document.getElementById('bubbleControls').classList.remove('hidden');
            this.renderBubblePreview();
        } else if (type === 'carousel') {
            document.getElementById('carouselControls').classList.remove('hidden');
            this.renderCarouselPreview();
        } else {
            this.updatePreview();
        }

        this.updateCodeWithEditMode();
    }

    addBubble() {
        const bubbleType = document.getElementById('bubbleType').value;
        const bubbleId = Date.now();

        const bubbleTemplates = {
            simple: {
                type: 'simple',
                text: 'This is a simple message bubble',
                timestamp: new Date().toLocaleTimeString()
            },
            card: {
                type: 'card',
                title: 'Card Title',
                body: 'This is a card message with header, body and actions.',
                actions: ['Action 1', 'Action 2']
            },
            sender: {
                type: 'sender',
                text: 'Message from sender',
                timestamp: new Date().toLocaleTimeString()
            },
            receiver: {
                type: 'receiver',
                text: 'Message from receiver',
                timestamp: new Date().toLocaleTimeString()
            },
            grouped: {
                type: 'grouped',
                text: 'Main message',
                groups: [
                    {
                        title: 'Group 1',
                        items: [
                            { type: 'text', text: 'First item in group 1', size: 'md', color: '#374151' },
                            { type: 'text', text: 'Second item in group 1', size: 'sm', color: '#6B7280' }
                        ]
                    },
                    {
                        title: 'Group 2',
                        items: [
                            { type: 'text', text: 'First item in group 2', size: 'md', color: '#374151' },
                            { type: 'button', label: 'Action Button', text: 'Button clicked', style: 'primary' }
                        ]
                    }
                ]
            },
            'additional-texts': {
                type: 'simple',
                text: 'Main message text',
                additionalTexts: [
                    { text: 'Additional info line 1', size: 'sm', color: '#6B7280' },
                    { text: 'Additional info line 2', size: 'sm', color: '#6B7280' },
                    { text: 'Important note', size: 'md', color: '#EF4444', weight: 'bold' }
                ]
            }
        };

        const bubble = {
            id: bubbleId,
            ...bubbleTemplates[bubbleType]
        };

        this.bubbles.push(bubble);
        this.renderBubblePreview();
        this.updateCodeWithEditMode();

        // Show example code if it's a grouped or additional-texts bubble
        if (bubbleType === 'grouped' || bubbleType === 'additional-texts') {
            this.showExampleBubbleCode(bubbleType);
        }
    }

    showExampleBubbleCode(bubbleType) {
        let message = '';
        if (bubbleType === 'grouped') {
            message = `
✨ สร้าง Bubble แบบ Grouped Content สำเร็จ!

💡 โครงสร้าง JSON สามารถใช้ groups เป็น array ของ objects:
• groups: [{ title: "", items: [{ type: "text", text: "" }, ...] }]
• แต่ละ group สามารถมี title และ items หลายตัว
• items รองรับ type: "text" และ "button"
• มี separator แยกระหว่าง groups อัตโนมัติ`;
        } else if (bubbleType === 'additional-texts') {
            message = `
✨ สร้าง Bubble แบบ Additional Texts สำเร็จ!

💡 โครงสร้าง JSON สามารถใช้ additionalTexts เป็น array:
• additionalTexts: [{ text: "", size: "", color: "", weight: "" }]
• แสดงข้อความเพิ่มเติมหลังจากข้อความหลัก
• สามารถกำหนด style แต่ละข้อความได้`;
        }

        this.showNotification(message, 'info');
    }

    clearBubbles() {
        this.bubbles = [];
        this.renderBubblePreview();
        this.updateCodeWithEditMode();
    }

    renderBubblePreview() {
        const container = document.getElementById('flexContainer');
        container.innerHTML = '';
        container.className = 'flex-preview-container';

        if (this.bubbles.length === 0) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center text-center text-gray-400 py-16 min-h-[200px]">
                    <i class="fas fa-comment-dots text-5xl mb-4 text-gray-500"></i>
                    <p class="text-lg font-medium">No bubbles yet. Click "Add Bubble" to start.</p>
                    <p class="text-sm text-gray-500 mt-2">เลือกประเภท Bubble และคลิก "เพิ่ม Bubble"</p>
                </div>
            `;
            return;
        }

        this.bubbles.forEach((bubble, index) => {
            const bubbleEl = this.createBubbleElement(bubble, index);
            container.appendChild(bubbleEl);
        });
    }

    createBubbleElement(bubble, index = 0) {
        const bubbleEl = document.createElement('div');
        bubbleEl.className = `message-bubble ${bubble.type} bubble-appear`;
        bubbleEl.dataset.bubbleId = bubble.id || index + 1;

        let content = '';

        switch (bubble.type) {
            case 'simple':
                content = `
                    <div class="bubble-text">${bubble.text}</div>
                    ${bubble.additionalTexts ? this.renderAdditionalTexts(bubble.additionalTexts) : ''}
                    <div class="timestamp text-xs text-gray-400 mt-2">${bubble.timestamp || new Date().toLocaleTimeString()}</div>
                `;
                break;

            case 'card':
                content = `
                    <div class="bubble-header">${bubble.title}</div>
                    <div class="bubble-body">${bubble.body}</div>
                    <div class="bubble-actions">
                        ${(bubble.actions || []).map((action, actionIndex) => `
                            <button class="bubble-action" data-action="${actionIndex}">${action}</button>
                        `).join('')}
                    </div>
                `;
                break;

            case 'grouped':
                content = `
                    <div class="bubble-text">${bubble.text}</div>
                    ${bubble.groups ? this.renderGroupedContent(bubble.groups) : ''}
                    <div class="timestamp text-xs text-gray-400 mt-2">${bubble.timestamp || new Date().toLocaleTimeString()}</div>
                `;
                break;

            case 'sender':
            case 'receiver':
                content = `
                    <div class="bubble-text">${bubble.text}</div>
                    ${bubble.additionalTexts ? this.renderAdditionalTexts(bubble.additionalTexts) : ''}
                    <div class="timestamp text-xs opacity-70 mt-1">${bubble.timestamp || new Date().toLocaleTimeString()}</div>
                `;
                break;
        }

        bubbleEl.innerHTML = content;

        // Add click handler for editing
        bubbleEl.addEventListener('click', () => {
            this.editBubble(bubble.id || index + 1);
        });

        return bubbleEl;
    }

    renderGroupedContent(groups) {
        if (!groups || !Array.isArray(groups)) return '';

        return groups.map((group, groupIndex) => {
            const separator = groupIndex > 0 ? '<div class="bubble-separator"></div>' : '';
            const title = group.title ? `<div class="group-title text-xs font-semibold text-gray-500 mb-2">${group.title}</div>` : '';
            const items = group.items ? group.items.map(item => {
                if (item.type === 'text') {
                    return `<div class="group-text text-sm ${item.color === '#EF4444' ? 'text-red-400' : 'text-gray-300'} ${item.weight === 'bold' ? 'font-bold' : ''}">${item.text}</div>`;
                } else if (item.type === 'button') {
                    return `<button class="group-button bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs text-white mt-1">${item.label}</button>`;
                }
                return '';
            }).join('') : '';

            return `
                ${separator}
                <div class="bubble-group mt-3">
                    ${title}
                    <div class="group-items space-y-1">
                        ${items}
                    </div>
                </div>
            `;
        }).join('');
    }

    renderAdditionalTexts(additionalTexts) {
        if (!additionalTexts || !Array.isArray(additionalTexts)) return '';

        return `
            <div class="bubble-separator"></div>
            <div class="additional-texts mt-3 space-y-1">
                ${additionalTexts.map(item => `
                    <div class="additional-text text-sm ${item.color === '#EF4444' ? 'text-red-400' : 'text-gray-400'} ${item.weight === 'bold' ? 'font-bold' : ''}">${item.text}</div>
                `).join('')}
            </div>
        `;
    }

    editBubble(bubbleId) {
        const bubble = this.bubbles.find(b => b.id === bubbleId);
        if (!bubble) return;

        let editPrompt = '';
        let currentValue = '';

        // Determine what to edit based on bubble type
        switch (bubble.type) {
            case 'card':
                if (bubble.title) {
                    editPrompt = 'Edit card title:';
                    currentValue = bubble.title;
                } else {
                    editPrompt = 'Edit card body:';
                    currentValue = bubble.body || '';
                }
                break;
            case 'grouped':
                editPrompt = 'Edit main message:';
                currentValue = bubble.text || '';
                break;
            default:
                editPrompt = 'Edit message:';
                currentValue = bubble.text || bubble.body || '';
        }

        const newText = prompt(editPrompt, currentValue);
        if (newText !== null && newText !== currentValue) {
            // Update the appropriate property based on bubble type
            switch (bubble.type) {
                case 'card':
                    if (bubble.title !== undefined) {
                        bubble.title = newText;
                    } else if (bubble.body !== undefined) {
                        bubble.body = newText;
                    }
                    break;
                default:
                    if (bubble.text !== undefined) {
                        bubble.text = newText;
                    } else if (bubble.body !== undefined) {
                        bubble.body = newText;
                    }
            }

            // Update both preview and code
            this.renderBubblePreview();
            this.updateCodeWithEditMode();

            // Show confirmation
            this.showNotification(
                `${bubble.type === 'card' ? 'Card' : 'Bubble'} updated successfully!`, 
                'success'
            );
        }
    }

    generateCarousel() {
        const itemCount = parseInt(document.getElementById('carouselItemCount').value) || 3;
        this.carouselData.items = [];

        for (let i = 1; i <= itemCount; i++) {
            this.carouselData.items.push({
                id: i,
                title: `Card ${i}`,
                description: `This is carousel item ${i} with some description text.`,
                image: `https://via.placeholder.com/280x160/10b981/ffffff?text=Item+${i}`,
                action: `Action ${i}`
            });
        }

        this.carouselData.currentIndex = 0;
        this.renderCarouselPreview();
        this.updateCarouselAutoSlide();
        this.updateCodeWithEditMode();
    }

    resetCarousel() {
        this.carouselData.items = [];
        this.carouselData.currentIndex = 0;
        this.clearCarouselAutoSlide();
        this.renderCarouselPreview();
        this.updateCodeWithEditMode();
    }

    renderCarouselPreview() {
        const container = document.getElementById('flexContainer');
        container.innerHTML = '';
        container.className = 'flex-preview-container overflow-hidden';

        if (this.carouselData.items.length === 0) {
            container.innerHTML = `
                <div class="text-center text-gray-400 py-8">
                    <i class="fas fa-images text-4xl mb-4 text-gray-500"></i>
                    <p>No carousel items. Click "Generate Carousel" to start.</p>
                </div>
            `;
            return;
        }

        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'carousel-container';

        carouselContainer.innerHTML = `
            <div class="carousel-wrapper">
                <div class="carousel-track" id="carouselTrack">
                    ${this.carouselData.items.map(item => `
                        <div class="carousel-item" data-item-id="${item.id}">
                            <div class="carousel-header">
                                <div class="carousel-image">
                                    ${item.title}
                                </div>
                            </div>
                            <div class="carousel-content">
                                <div class="carousel-body">
                                    <h3>${item.title}</h3>
                                    <p class="carousel-description">${item.description}</p>
                                </div>
                                <div class="carousel-footer">
                                    <button class="bubble-action primary">${item.action}</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="carousel-controls flex justify-center items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                <button class="carousel-btn" id="prevBtn">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <span class="text-gray-400 text-xs sm:text-sm font-medium">${this.carouselData.currentIndex + 1} / ${this.carouselData.items.length}</span>
                <button class="carousel-btn" id="nextBtn">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            
            <div class="carousel-indicators flex justify-center gap-1 sm:gap-2 mt-2 sm:mt-3">
                ${this.carouselData.items.map((_, index) => `
                    <div class="carousel-indicator ${index === this.carouselData.currentIndex ? 'active' : ''}" 
                         data-index="${index}"></div>
                `).join('')}
            </div>
        `;

        container.appendChild(carouselContainer);
        this.bindCarouselEvents();

        // Initial setup with active state
        setTimeout(() => {
            this.updateCarouselPosition();
        }, 100);
    }

    bindCarouselEvents() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicators = document.querySelectorAll('.carousel-indicator');
        const carouselWrapper = document.querySelector('.carousel-wrapper');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevCarouselItem());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextCarouselItem());
        }

        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.goToCarouselItem(index);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.closest('.carousel-container')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.prevCarouselItem();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextCarouselItem();
                }
            }
        });

        // Touch/Swipe support for mobile
        if (carouselWrapper) {
            let touchStartX = 0;
            let touchEndX = 0;
            let isDragging = false;

            carouselWrapper.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                isDragging = true;
            });

            carouselWrapper.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                e.preventDefault(); // Prevent scrolling
            });

            carouselWrapper.addEventListener('touchend', (e) => {
                if (!isDragging) return;
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe(touchStartX, touchEndX);
                isDragging = false;
            });

            // Mouse drag support for desktop
            carouselWrapper.addEventListener('mousedown', (e) => {
                touchStartX = e.screenX;
                isDragging = true;
                carouselWrapper.style.cursor = 'grabbing';
            });

            carouselWrapper.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
            });

            carouselWrapper.addEventListener('mouseup', (e) => {
                if (!isDragging) return;
                touchEndX = e.screenX;
                this.handleSwipe(touchStartX, touchEndX);
                isDragging = false;
                carouselWrapper.style.cursor = 'grab';
            });

            carouselWrapper.addEventListener('mouseleave', () => {
                isDragging = false;
                carouselWrapper.style.cursor = 'grab';
            });

            // Set initial grab cursor
            carouselWrapper.style.cursor = 'grab';
        }
    }

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const difference = startX - endX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // Swiped left, go to next
                this.nextCarouselItem();
            } else {
                // Swiped right, go to previous
                this.prevCarouselItem();
            }
        }
    }

    prevCarouselItem() {
        if (this.carouselData.currentIndex > 0) {
            this.carouselData.currentIndex--;
        } else {
            this.carouselData.currentIndex = this.carouselData.items.length - 1;
        }
        this.updateCarouselPosition('prev');
    }

    nextCarouselItem() {
        if (this.carouselData.currentIndex < this.carouselData.items.length - 1) {
            this.carouselData.currentIndex++;
        } else {
            this.carouselData.currentIndex = 0;
        }
        this.updateCarouselPosition('next');
    }

    goToCarouselItem(index) {
        const direction = index > this.carouselData.currentIndex ? 'next' : 'prev';
        this.carouselData.currentIndex = index;
        this.updateCarouselPosition(direction);
    }

    updateCarouselPosition(direction = null) {
        const track = document.getElementById('carouselTrack');
        const indicators = document.querySelectorAll('.carousel-indicator');
        const counterSpan = document.querySelector('.carousel-controls span');
        const carouselItems = document.querySelectorAll('.carousel-item');

        if (track) {
            // Add sliding class for smooth animation
            track.classList.add('sliding');

            // For single-card view, each item takes 100% width
            const translateX = -this.carouselData.currentIndex * 100;
            track.style.transform = `translateX(${translateX}%)`;

            // Remove sliding class after animation
            setTimeout(() => {
                track.classList.remove('sliding');
            }, 600);
        }

        // Update active states and animations
        carouselItems.forEach((item, index) => {
            // Remove all animation classes
            item.classList.remove('carousel-active', 'slide-next', 'slide-prev');

            // Add active class to current item
            if (index === this.carouselData.currentIndex) {
                item.classList.add('carousel-active');

                // Add animation based on direction
                if (direction === 'next') {
                    item.classList.add('slide-next');
                } else if (direction === 'prev') {
                    item.classList.add('slide-prev');
                }
            }
        });

        // Update indicators with smooth transition
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.carouselData.currentIndex);
        });

        // Update counter
        if (counterSpan) {
            counterSpan.textContent = `${this.carouselData.currentIndex + 1} / ${this.carouselData.items.length}`;
        }

        // Clean up animation classes after animation completes
        setTimeout(() => {
            carouselItems.forEach(item => {
                item.classList.remove('slide-next', 'slide-prev');
            });
        }, 600);
    }

    updateCarouselAutoSlide() {
        this.clearCarouselAutoSlide();

        const autoSlideTime = parseInt(document.getElementById('autoSlideTime').value);
        if (autoSlideTime > 0 && this.carouselData.items.length > 1) {
            this.carouselData.autoSlideInterval = setInterval(() => {
                this.nextCarouselItem();
            }, autoSlideTime * 1000);
        }
    }

    clearCarouselAutoSlide() {
        if (this.carouselData.autoSlideInterval) {
            clearInterval(this.carouselData.autoSlideInterval);
            this.carouselData.autoSlideInterval = null;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    toggleEditMode() {
        this.editMode = !this.editMode;
        console.log('DEBUG: toggleEditMode() - editMode now =', this.editMode);
        const codeOutput = document.getElementById('codeOutput');
        const codeEditor = document.getElementById('codeEditor');
        const toggleBtn = document.getElementById('toggleEditMode');
        const copyBtn = document.getElementById('copyCode');
        const applyBtn = document.getElementById('applyCode');
        const codeTabBtns = document.querySelectorAll('.code-tab-btn');

        if (this.editMode) {
            // Switch to edit mode
            codeOutput.classList.add('hidden');
            codeEditor.classList.remove('hidden');
            applyBtn.classList.remove('hidden');

            // Force currentTab to 'linejson' since only LINE JSON is supported
            if (this.currentTab !== 'linejson') {
                console.warn(`Edit mode: Forcing currentTab from '${this.currentTab}' to 'linejson'`);
                this.currentTab = 'linejson';
            }

            // Disable code tab buttons
            codeTabBtns.forEach(btn => {
                btn.classList.add('opacity-50', 'cursor-not-allowed');
                btn.style.pointerEvents = 'none';
            });

            // Copy current code to editor
            const currentCode = codeOutput.textContent || codeOutput.innerText || '';
            codeEditor.value = currentCode;

            // Debug info
            console.log('Edit mode activated:', {
                currentTab: this.currentTab,
                currentContainer: this.currentContainer,
                codeLength: currentCode.length
            });

            // Update button
            toggleBtn.innerHTML = '<i class="fas fa-eye mr-1"></i><span data-lang="preview">Preview</span>';
            toggleBtn.classList.remove('bg-purple-700', 'hover:bg-purple-600');
            toggleBtn.classList.add('bg-orange-700', 'hover:bg-orange-600');

            // Update language for new span
            this.updateLanguage();

            // Focus editor
            codeEditor.focus();
        } else {
            // Switch to preview mode
            codeOutput.classList.remove('hidden');
            codeEditor.classList.add('hidden');
            applyBtn.classList.add('hidden');

            // Enable code tab buttons
            codeTabBtns.forEach(btn => {
                btn.classList.remove('opacity-50', 'cursor-not-allowed');
                btn.style.pointerEvents = 'auto';
            });

            // Update button
            toggleBtn.innerHTML = '<i class="fas fa-edit mr-1"></i><span data-lang="editMode">Edit</span>';
            toggleBtn.classList.remove('bg-orange-700', 'hover:bg-orange-600');
            toggleBtn.classList.add('bg-purple-700', 'hover:bg-purple-600');

            // Update language for new span
            this.updateLanguage();
        }
    }

    applyEditedCode() {
        const codeEditor = document.getElementById('codeEditor');
        const editedCode = codeEditor.value;

        if (!editedCode.trim()) {
            this.showNotification('Please enter some code to apply', 'error');
            return;
        }

        // Debug info
        console.log('Applying edited code:', {
            editMode: this.editMode,
            currentTab: this.currentTab,
            currentContainer: this.currentContainer,
            codeLength: editedCode.length,
            codePreview: editedCode.substring(0, 100) + (editedCode.length > 100 ? '...' : '')
        });

        try {
            // Store original state for rollback if needed
            const originalHTML = document.getElementById('flexContainer').innerHTML;
            const originalStyles = document.getElementById('flexContainer').style.cssText;

            // Check if carousel is available for carousel container
            if (this.currentContainer === 'carousel' && this.carouselData.items.length === 0) {
                this.showNotification('Please generate carousel items first before editing', 'error');
                return;
            }

            // Force currentTab to 'linejson' since only LINE JSON is supported now
            if (this.currentTab !== 'linejson') {
                console.warn(`Unsupported tab type: ${this.currentTab}, forcing to 'linejson'`);
                this.currentTab = 'linejson';
            }

            console.log(`Applying ${this.currentTab} to ${this.currentContainer} container`);

            // Apply the code - only LINE JSON is supported now
            this.applyLINEJSONToPreview(editedCode);

            // Update code output to show applied changes
            this.updateCodeOutput(editedCode);

            // Validate and provide feedback without rebuilding
            this.validateAppliedCode(editedCode);

            console.log('Code output preserved - showing user edited code in edit mode');

            this.showNotification(`${this.currentTab.toUpperCase()} code applied successfully! Preview updated.`, 'success');

        } catch (error) {
            console.error('Error applying code:', error);
            this.showNotification('Error applying code: ' + error.message, 'error');

            // Restore original state if error occurred
            try {
                const container = document.getElementById('flexContainer');
                container.innerHTML = originalHTML;
                container.style.cssText = originalStyles;
            } catch (restoreError) {
                console.error('Failed to restore original state:', restoreError);
            }
        }
    }

    rebuildPreviewFromCode(editedCode) {
        console.log('Rebuilding preview from edited code...');

        try {
            // For different container types, rebuild accordingly
            if (this.currentContainer === 'carousel') {
                this.rebuildCarouselFromCode(editedCode);
            } else if (this.currentContainer === 'bubble') {
                this.rebuildBubbleFromCode(editedCode);
            } else {
                this.rebuildFlexboxFromCode(editedCode);
            }
        } catch (error) {
            console.warn('Preview rebuild failed:', error);
            // Continue without rebuilding
        }
    }

    rebuildCarouselFromCode(editedCode) {
        if (this.currentTab === 'linejson') {
            // For LINE JSON, data already updated in applyLINEJSONToPreview
            return;
        }

        // For other tabs, ensure carousel is properly initialized
        const container = document.getElementById('flexContainer');
        const carouselContainer = container.querySelector('.carousel-container');

        if (!carouselContainer && this.carouselData.items.length > 0) {
            console.log('Carousel container missing, re-rendering...');
            this.renderCarouselPreview();
        } else if (carouselContainer) {
            // Re-bind events to ensure functionality
            setTimeout(() => {
                this.bindCarouselEvents();
                this.updateCarouselPosition();
            }, 100);
        }
    }

    rebuildBubbleFromCode(editedCode) {
        // For all tabs, ensure bubbles are properly displayed
        const container = document.getElementById('flexContainer');
        const bubbleContainer = container.querySelector('.message-bubble, .bubble-container');

        if (!bubbleContainer && this.bubbles.length > 0) {
            console.log('Bubble container missing, re-rendering...');
            this.renderBubblePreview();
        }
    }

    rebuildFlexboxFromCode(editedCode) {
        // For all tabs, ensure flexbox items are properly displayed
        const container = document.getElementById('flexContainer');
        const flexItems = container.querySelectorAll('.flex-item');

        if (flexItems.length === 0 && this.currentConfig.items.length > 0) {
            console.log('Flex items missing, re-rendering...');
            this.updatePreview();
        }
    }

    updateCodeOutput(newCode) {
        const codeOutput = document.getElementById('codeOutput');
        if (codeOutput) {
            // Handle empty code for bubble container with no bubbles
            if (newCode === '' && this.currentContainer === 'bubble') {
                codeOutput.innerHTML = `<div class="text-center text-gray-400 py-8">
                    <i class="fas fa-code text-3xl mb-3 text-gray-500"></i>
                    <p>ไม่มีโค้ด LINE JSON</p>
                    <p class="text-sm">เพิ่ม Bubble เพื่อดูโค้ด</p>
                </div>`;
            } else {
                // Use innerHTML with proper language class for syntax highlighting
                let language = this.currentTab;
                if (this.currentTab === 'linejson') {
                    language = 'json';
                }

                codeOutput.innerHTML = `<code class="language-${language}">${this.escapeHtml(newCode)}</code>`;

                // Re-apply syntax highlighting
                if (window.Prism) {
                    window.Prism.highlightElement(codeOutput.querySelector('code'));
                }
            }
        }
    }

    validateAppliedCode(code) {
        console.log('Validating applied code...');

        try {
            const container = document.getElementById('flexContainer');
            const validation = {
                hasContent: container.children.length > 0,
                hasCorrectStructure: false,
                elementCount: container.children.length,
                codeLength: code.length
            };

            // Validate based on container type
            if (this.currentContainer === 'carousel') {
                const carouselContainer = container.querySelector('.carousel-container');
                const carouselItems = container.querySelectorAll('.carousel-item');
                validation.hasCorrectStructure = carouselContainer && carouselItems.length > 0;
                validation.carouselItemCount = carouselItems.length;

                console.log('Carousel validation:', {
                    hasCarouselContainer: !!carouselContainer,
                    itemCount: carouselItems.length,
                    dataItemCount: this.carouselData.items.length
                });

            } else if (this.currentContainer === 'bubble') {
                const bubbles = container.querySelectorAll('.message-bubble');
                validation.hasCorrectStructure = bubbles.length > 0;
                validation.bubbleCount = bubbles.length;

                console.log('Bubble validation:', {
                    bubbleCount: bubbles.length,
                    dataBubbleCount: this.bubbles.length
                });

            } else {
                const flexItems = container.querySelectorAll('.flex-item');
                validation.hasCorrectStructure = flexItems.length > 0;
                validation.flexItemCount = flexItems.length;

                console.log('Flexbox validation:', {
                    flexItemCount: flexItems.length,
                    configItemCount: this.currentConfig.items.length
                });
            }

            console.log('Code validation results:', validation);

            // Show validation feedback
            if (!validation.hasContent) {
                this.showNotification(this.currentLang === 'th' ?
                    'คำเตือน: Preview ไม่มีเนื้อหา' :
                    'Warning: Preview has no content', 'warning');
            } else if (!validation.hasCorrectStructure) {
                this.showNotification(this.currentLang === 'th' ?
                    'คำเตือน: โครงสร้างของ Preview อาจไม่ถูกต้อง' :
                    'Warning: Preview structure may be incorrect', 'warning');
            }

        } catch (error) {
            console.warn('Code validation failed:', error);
        }
    }

    applyLINEJSONToPreview(jsonCode) {
        const container = document.getElementById('flexContainer');
        console.log('Applying LINE JSON to preview:', { container: this.currentContainer, jsonLength: jsonCode.length });

        try {
            const jsonData = JSON.parse(jsonCode);
            console.log('Parsed LINE JSON:', jsonData);

            // When bubble container is selected, always use bubble handler
            if (this.currentContainer === 'bubble') {
                console.log('Bubble container detected - using bubble handler');
                this.applyLINEBubbleToPreview(jsonData);
            } else {
                // Determine the type based on content structure for other containers
                let contentType = jsonData.type;
                if (jsonData.contents) {
                    if (jsonData.contents.type === 'carousel') {
                        contentType = 'carousel';
                    } else if (jsonData.contents.type === 'bubble') {
                        contentType = 'flex';
                    }
                }

                if (contentType === 'flex' || (jsonData.contents && jsonData.contents.type === 'bubble')) {
                    this.applyLINEFlexToPreview(jsonData);
                } else if (contentType === 'carousel' || (jsonData.contents && jsonData.contents.type === 'carousel')) {
                    this.applyLINECarouselToPreview(jsonData.contents || jsonData);
                } else {
                    // Try to detect based on current container
                    if (this.currentContainer === 'carousel') {
                        this.applyLINECarouselToPreview(jsonData);
                    } else {
                        this.applyLINEFlexToPreview(jsonData);
                    }
                }
            }

            // Sync control buttons with applied LINE JSON if in edit mode
            // Only sync controls for flexbox container to avoid affecting bubble/carousel
            if (this.editMode && this.currentContainer === 'flexbox') {
                this.syncControlsFromLINEJSON(jsonData);
            }

            console.log('LINE JSON applied successfully');
        } catch (error) {
            console.error('LINE JSON parsing error:', error);
            throw new Error(`LINE JSON parsing failed: ${error.message}`);
        }
    }

    syncControlsFromLINEJSON(jsonData) {
        console.log('Syncing controls from applied LINE JSON...');

        let configChanged = false;

        // Extract flexbox properties from LINE JSON structure
        let contentData = jsonData;
        if (jsonData.body && jsonData.body.contents) {
            contentData = jsonData.body;
        } else if (jsonData.contents) {
            contentData = jsonData;
        }

        // Check for layout properties in LINE JSON
        if (contentData.layout) {
            const layout = contentData.layout;

            // Map LINE layout properties to flexbox properties
            if (layout.type === 'vertical' && this.currentConfig.flexDirection !== 'column') {
                this.currentConfig.flexDirection = 'column';
                configChanged = true;
            } else if (layout.type === 'horizontal' && this.currentConfig.flexDirection !== 'row') {
                this.currentConfig.flexDirection = 'row';
                configChanged = true;
            }

            // Check spacing
            if (layout.spacing !== undefined) {
                const spacingValue = parseInt(layout.spacing) || 0;
                if (this.currentConfig.gap !== spacingValue) {
                    this.currentConfig.gap = spacingValue;
                    configChanged = true;
                }
            }

            // Check padding
            if (layout.paddingAll !== undefined) {
                const paddingValue = parseInt(layout.paddingAll) || 0;
                if (this.currentConfig.padding !== paddingValue) {
                    this.currentConfig.padding = paddingValue;
                    configChanged = true;
                }
            }
        }

        // Check for flex properties in contents array
        if (contentData.contents && Array.isArray(contentData.contents)) {
            const flexItems = contentData.contents.map((item, index) => ({
                id: index + 1,
                flex: item.flex || '1',
                alignSelf: this.convertLINEAlignToCSS(item.align) || 'auto',
                order: item.order || 0
            }));

            // Update items if different
            if (JSON.stringify(this.currentConfig.items) !== JSON.stringify(flexItems)) {
                this.currentConfig.items = flexItems;
                configChanged = true;
            }
        }

        // Update controls if configuration changed
        if (configChanged) {
            console.log('Configuration changed from LINE JSON, updating controls...', this.currentConfig);
            this.updateControls();
            this.generateItemControls();
            this.showNotification('Control buttons synchronized with applied LINE JSON!', 'success');
            this.saveToHistory();
        } else {
            console.log('No configuration changes detected from LINE JSON');
        }
    }

    convertLINEAlignToCSS(lineAlign) {
        const alignMap = {
            'start': 'flex-start',
            'end': 'flex-end',
            'center': 'center',
            'baseline': 'baseline',
            'stretch': 'stretch'
        };
        return alignMap[lineAlign] || 'auto';
    }

    applyLINEFlexToPreview(jsonData) {
        console.log('Applying LINE flex to preview:', jsonData);

        let configChanged = false;
        let dataSource = null;

        // Determine data source from various JSON structures
        // Check for standard LINE Flex Message structure first
        if (jsonData.contents && jsonData.contents.body && jsonData.contents.body.contents) {
            dataSource = jsonData.contents.body;
            console.log('Using LINE Flex Message structure: jsonData.contents.body');
        } else if (jsonData.body && jsonData.body.contents) {
            dataSource = jsonData.body;
            console.log('Using jsonData.body structure');
        } else if (jsonData.contents && Array.isArray(jsonData.contents)) {
            dataSource = jsonData;
            console.log('Using jsonData.contents array structure');
        } else if (jsonData.layout || jsonData.type) {
            dataSource = jsonData;
            console.log('Using direct jsonData structure');
        } else {
            // Try to extract from nested structures
            if (jsonData.body) {
                dataSource = jsonData.body;
                console.log('Using jsonData.body fallback');
            } else {
                dataSource = jsonData;
                console.log('Using jsonData direct fallback');
            }
        }

        console.log('DEBUG: Selected dataSource:', dataSource);
        console.log('DEBUG: dataSource.contents length:', dataSource?.contents?.length || 'undefined');

        // Update container based on LINE layout
        if (dataSource.layout) {
            const layout = dataSource.layout;
            console.log('Found layout properties:', layout);

            if (layout.type === 'vertical' && this.currentConfig.flexDirection !== 'column') {
                this.currentConfig.flexDirection = 'column';
                configChanged = true;
                console.log('Updated flexDirection to column');
            } else if (layout.type === 'horizontal' && this.currentConfig.flexDirection !== 'row') {
                this.currentConfig.flexDirection = 'row';
                configChanged = true;
                console.log('Updated flexDirection to row');
            }

            if (layout.spacing !== undefined) {
                // Handle both pixel values and LINE spacing keywords
                let spacingValue;
                if (typeof layout.spacing === 'string' && isNaN(parseInt(layout.spacing))) {
                    // It's a LINE spacing keyword like "sm", "md", etc.
                    spacingValue = this.convertSpacingToGap(layout.spacing);
                } else {
                    // It's a number or pixel value
                    spacingValue = parseInt(layout.spacing) || 0;
                }
                
                if (this.currentConfig.gap !== spacingValue) {
                    this.currentConfig.gap = spacingValue;
                    configChanged = true;
                    console.log('Updated gap to', spacingValue, 'from spacing:', layout.spacing);
                }
            }

            if (layout.paddingAll !== undefined) {
                // Handle both pixel values like "20px" and plain numbers
                const paddingValue = parseInt(layout.paddingAll) || 0;
                if (this.currentConfig.padding !== paddingValue) {
                    this.currentConfig.padding = paddingValue;
                    configChanged = true;
                    console.log('Updated padding to', paddingValue, 'from paddingAll:', layout.paddingAll);
                }
            }

            // Check for justify and align properties
            if (layout.justifyContent && this.currentConfig.justifyContent !== layout.justifyContent) {
                this.currentConfig.justifyContent = layout.justifyContent;
                configChanged = true;
                console.log('Updated justifyContent to', layout.justifyContent);
            }

            if (layout.alignItems && this.currentConfig.alignItems !== layout.alignItems) {
                this.currentConfig.alignItems = layout.alignItems;
                configChanged = true;
                console.log('Updated alignItems to', layout.alignItems);
            }
        }

        // Update items from contents
        if (dataSource.contents && Array.isArray(dataSource.contents)) {
            console.log('DEBUG: Found contents array with', dataSource.contents.length, 'items');
            console.log('DEBUG: Contents sample:', dataSource.contents[0]);

            const newItems = dataSource.contents.map((item, index) => {
                const newItem = {
                    id: index + 1,
                    flex: item.flex ? String(item.flex) : '1',
                    alignSelf: this.convertLINEAlignToCSS(item.align) || 'auto',
                    order: item.order || 0,
                    text: item.text || `Item ${index + 1}` // เก็บข้อความจาก LINE JSON
                };
                console.log(`DEBUG: Created item ${index + 1}:`, newItem);
                return newItem;
            });

            console.log('DEBUG: Current items:', this.currentConfig.items);
            console.log('DEBUG: New items:', newItems);

            // Always update items to ensure preview reflects the JSON
            const oldItemCount = this.currentConfig.items.length;
            this.currentConfig.items = newItems;
            configChanged = true;
            
            console.log(`Updated items from contents: ${oldItemCount} -> ${newItems.length} items`);
            
        } else if (dataSource.contents) {
            console.log('Non-array contents detected:', typeof dataSource.contents, dataSource.contents);
            // Handle non-array contents by creating default items
            this.currentConfig.items = [
                { id: 1, flex: '1', alignSelf: 'auto', order: 0, text: 'Item 1' },
                { id: 2, flex: '1', alignSelf: 'auto', order: 0, text: 'Item 2' }
            ];
            configChanged = true;
            console.log('Created default 2 items');
        } else {
            console.log('DEBUG: No contents found in dataSource');
            console.log('DEBUG: Available dataSource keys:', Object.keys(dataSource || {}));
            
            // Fallback: if no contents found but we're in edit mode, preserve current items count
            if (this.editMode && this.currentConfig.items.length > 0) {
                console.log('DEBUG: Edit mode - preserving current items count:', this.currentConfig.items.length);
                // Keep existing items but reset their properties to defaults
                this.currentConfig.items = this.currentConfig.items.map((item, index) => ({
                    id: index + 1,
                    flex: '1',
                    alignSelf: 'auto',
                    order: 0,
                    text: item.text || `Item ${index + 1}`
                }));
                configChanged = true;
                console.log('DEBUG: Reset items to defaults while preserving count');
            }
        }

        // Force preview update regardless of configuration changes
        console.log('Forcing preview update after LINE JSON application');
        console.log('DEBUG: editMode =', this.editMode, 'currentTab =', this.currentTab);
        this.updatePreview();
        
        // Don't update code output in edit mode to preserve user's edited code
        if (!this.editMode) {
            this.updateCode(); // Only update code output when NOT in edit mode
            console.log('Code output updated (not in edit mode)');
        } else {
            console.log('Edit mode: Preserving user edited code, skipping updateCode()');
        }

        if (configChanged) {
            this.updateControls();
            this.generateItemControls();
            this.saveToHistory();
            console.log('Configuration changed, controls updated');
        }

        // Always update item controls to ensure they match the current items
        console.log('DEBUG: Ensuring item controls are in sync...');
        this.generateItemControls();

        this.showNotification('LINE JSON applied and preview updated!', 'success');
        console.log('LINE JSON application completed with config:', this.currentConfig);
        console.log('DEBUG: Final currentConfig.items:', this.currentConfig.items);
    }

    applyLINECarouselToPreview(jsonData) {
        console.log('Applying LINE JSON to carousel:', jsonData);

        if (jsonData.contents && jsonData.contents.length > 0) {
            // Update carousel data from LINE JSON
            this.carouselData.items = jsonData.contents.map((item, index) => ({
                id: index + 1,
                title: item.body?.contents?.[0]?.text || item.title || `Item ${index + 1}`,
                description: item.body?.contents?.[1]?.text || item.body?.contents?.[0]?.text || 'Description',
                action: item.footer?.contents?.[0]?.action?.label || item.action?.label || 'Action'
            }));

            // Reset current index
            this.carouselData.currentIndex = 0;

            // Re-render carousel with new data
            this.renderCarouselPreview();

            console.log('Carousel updated from LINE JSON:', this.carouselData.items);
        } else if (jsonData.type === 'carousel' && jsonData.contents) {
            // Handle different JSON structure
            this.applyLINECarouselToPreview(jsonData);
        } else {
            console.warn('Invalid LINE carousel JSON structure');
            throw new Error('Invalid carousel JSON structure');
        }
    }

    applyLINEBubbleToPreview(jsonData) {
        console.log('Applying LINE JSON to bubble preview:', jsonData);

        try {
            let bubbleData = null;
            let bubbles = [];

            // Detect if it's a single bubble or carousel of bubbles
            if (jsonData.contents) {
                if (jsonData.contents.type === 'carousel') {
                    // Multiple bubbles in carousel format
                    if (jsonData.contents.contents && Array.isArray(jsonData.contents.contents)) {
                        bubbles = jsonData.contents.contents.map((bubble, index) => 
                            this.parseLINEBubbleData(bubble, index + 1)
                        );
                    }
                } else if (jsonData.contents.type === 'bubble') {
                    // Single bubble
                    bubbles = [this.parseLINEBubbleData(jsonData.contents, 1)];
                }
            } else if (jsonData.type === 'flex' && jsonData.altText) {
                // Direct bubble structure
                bubbles = [this.parseLINEBubbleData(jsonData, 1)];
            } else if (jsonData.type === 'bubble') {
                // Direct bubble type
                bubbles = [this.parseLINEBubbleData(jsonData, 1)];
            }

            // Update bubbles data
            if (bubbles.length > 0) {
                this.bubbles = bubbles;
                console.log('Updated bubbles from LINE JSON:', this.bubbles);
                
                // Re-render bubble preview
                this.renderBubblePreview();
                
                this.showNotification(
                    `LINE JSON applied - ${bubbles.length} bubble${bubbles.length > 1 ? 's' : ''} updated`, 
                    'success'
                );
            } else {
                console.warn('No valid bubble data found in JSON');
                this.showNotification('Invalid bubble JSON format', 'warning');
            }

        } catch (error) {
            console.error('Error applying LINE JSON to bubble:', error);
            this.showNotification('Error applying bubble JSON: ' + error.message, 'error');
        }
    }

    parseLINEBubbleData(bubbleJson, bubbleId) {
        console.log('Parsing LINE bubble data:', bubbleJson);

        // Extract text content from bubble structure
        let text = 'Sample message';
        let type = 'simple';
        let header = null;
        let timestamp = new Date().toLocaleTimeString();
        let groups = null;
        let additionalTexts = null;

        // Parse bubble body contents
        if (bubbleJson.body && bubbleJson.body.contents) {
            const contents = bubbleJson.body.contents;
            
            // Check if has complex group structure
            const hasNestedBoxes = contents.some(item => item.type === 'box');
            const hasSeparators = contents.some(item => item.type === 'separator');
            
            if (hasNestedBoxes || hasSeparators) {
                // Parse complex grouped structure
                groups = this.parseGroupedContent(contents);
                type = 'grouped';
            } else {
                // Parse simple structure
                const textContents = contents.filter(item => item.type === 'text' && item.text);
                
                if (textContents.length > 0) {
                    // Main text is the first text element
                    text = textContents[0].text;
                    
                    // Determine bubble type based on text color
                    if (textContents[0].color === '#ffffff') {
                        type = 'sender';
                    } else if (textContents[0].color === '#374151') {
                        type = 'receiver';
                    } else {
                        type = 'simple';
                    }
                    
                    // Additional texts are the rest (excluding timestamp)
                    if (textContents.length > 1) {
                        additionalTexts = textContents.slice(1)
                            .filter(item => !this.isTimestampText(item))
                            .map(item => ({
                                text: item.text,
                                size: item.size || 'md',
                                color: item.color || '#374151',
                                weight: item.weight || 'regular'
                            }));
                    }
                }
            }
        }

        // Parse header if exists
        if (bubbleJson.header && bubbleJson.header.contents) {
            const headerContent = bubbleJson.header.contents.find(item => item.type === 'text');
            if (headerContent) {
                header = headerContent.text;
                if (type !== 'grouped') type = 'card';
            }
        }

        // Parse footer actions if exists (indicates card type)
        if (bubbleJson.footer && bubbleJson.footer.contents) {
            if (type !== 'grouped') type = 'card';
        }

        // Check bubble styles for type detection
        if (bubbleJson.styles && bubbleJson.styles.body) {
            if (bubbleJson.styles.body.backgroundColor === '#10b981') {
                type = 'sender';
            } else if (bubbleJson.styles.body.backgroundColor === '#374151') {
                type = 'receiver';
            } else if (bubbleJson.styles.body.backgroundColor === '#1F2937') {
                // Check if it's card or grouped based on other properties
                if (bubbleJson.header && bubbleJson.header.contents) {
                    type = 'card';
                } else if (groups && groups.length > 0) {
                    type = 'grouped';
                } else if (bubbleJson.footer && bubbleJson.footer.contents) {
                    type = 'card';
                } else {
                    // If has #1F2937 background but no clear indicators, keep existing type
                    // This preserves the type determined earlier in the function
                }
            }
        }

        const bubble = {
            id: bubbleId,
            type: type,
            text: text,
            timestamp: timestamp
        };

        // Add header for card type
        if (header) {
            bubble.header = header;
        }

        // Add grouped content
        if (groups && groups.length > 0) {
            bubble.groups = groups;
        }

        // Add additional texts
        if (additionalTexts && additionalTexts.length > 0) {
            bubble.additionalTexts = additionalTexts;
        }

        // Add actions for card type
        if ((type === 'card' || type === 'grouped') && bubbleJson.footer && bubbleJson.footer.contents) {
            bubble.actions = bubbleJson.footer.contents
                .filter(item => item.type === 'button')
                .map(button => button.action?.label || 'Action');
        }

        console.log('Parsed bubble:', bubble);
        return bubble;
    }

    parseGroupedContent(contents) {
        const groups = [];
        let currentGroup = null;

        contents.forEach(item => {
            if (item.type === 'separator') {
                // Separator indicates end of current group
                if (currentGroup && currentGroup.items.length > 0) {
                    groups.push(currentGroup);
                }
                currentGroup = null;
            } else if (item.type === 'box' && item.contents) {
                // Box container is a group
                const group = {
                    items: []
                };

                item.contents.forEach(boxItem => {
                    if (boxItem.type === 'text') {
                        group.items.push({
                            type: 'text',
                            text: boxItem.text,
                            size: boxItem.size || 'md',
                            color: boxItem.color || '#374151',
                            weight: boxItem.weight || 'regular',
                            align: boxItem.align || 'start'
                        });
                    } else if (boxItem.type === 'button') {
                        group.items.push({
                            type: 'button',
                            label: boxItem.action?.label || 'Button',
                            text: boxItem.action?.text || 'Button clicked',
                            style: boxItem.style || 'secondary'
                        });
                    }
                });

                if (group.items.length > 0) {
                    groups.push(group);
                }
            } else if (item.type === 'text' && item.text) {
                // Individual text item
                if (!currentGroup) {
                    currentGroup = { items: [] };
                }
                
                // Check if it's a group title (bold, small, gray)
                if (item.weight === 'bold' && item.size === 'sm' && item.color === '#6B7280') {
                    if (currentGroup.items.length > 0) {
                        groups.push(currentGroup);
                    }
                    currentGroup = { 
                        title: item.text,
                        items: [] 
                    };
                } else {
                    currentGroup.items.push({
                        type: 'text',
                        text: item.text,
                        size: item.size || 'md',
                        color: item.color || '#374151',
                        weight: item.weight || 'regular',
                        align: item.align || 'start'
                    });
                }
            }
        });

        // Add last group if exists
        if (currentGroup && currentGroup.items.length > 0) {
            groups.push(currentGroup);
        }

        return groups;
    }

    isTimestampText(textItem) {
        // Check if text looks like a timestamp
        if (!textItem.text) return false;
        
        // Check for time format patterns
        return /^\d{1,2}:\d{2}/.test(textItem.text) && 
               textItem.size === 'xs' && 
               ['#9CA3AF', '#6B7280'].includes(textItem.color);
    }


}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.flexGenerator = new FlexboxGenerator();
});

// Service Worker for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 