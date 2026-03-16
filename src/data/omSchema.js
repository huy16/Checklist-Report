export const omSchema = {
  generalInformation: {
    title: "Thông tin Dự án - O&M",
    fields: [
      { id: "om_projectName", label: "Tên dự án", type: "text" },
      { id: "om_siteLocation", label: "Vị trí dự án", type: "text" },
      { id: "om_inspectionDate", label: "Ngày kiểm tra", type: "date" },
      { id: "om_shopCode", label: "Mã shop", type: "text" }
    ]
  },
  categories: [
    {
      id: "om_dts",
      title: "1. Dây tín hiệu",
      icon: "Wifi",
      items: [
        { id: "om_1_1", label: "1.1. Kiểm tra dây mạng và ăng-ten của công tơ", type: "photo_status" },
        { id: "om_1_2", label: "1.2. Kiểm tra dây CT (bọc dây, bảo vệ)", type: "photo_status" }
      ]
    },
    {
      id: "om_pv",
      title: "2. Hệ thống Pin mặt trời",
      icon: "Sun",
      items: [
        { id: "om_2_1", label: "2.1. Chụp ảnh tổng quan và Đánh giá Tình trạng (Tối đa 4 ảnh)", type: "multi_photo", max: 4 },
        { id: "om_2_2", label: "2.2. Kiểm tra quét nhiệt hệ thống Pin mặt trời (≤65°C)", type: "photo_status" },
        { id: "om_2_3", label: "2.3. Kiểm tra quét nhiệt MC4 (≤45°C)", type: "photo_status" },
        { id: "om_2_4", label: "2.4. Kiểm tra cố định MC4 (Nhập tình trạng)", type: "photo_status" },
        { id: "om_2_5", label: "2.5. Kiểm tra ống ruột gà đi dây cáp DC trên mái (tình trạng, độ kín)", type: "photo_status" }
      ]
    },
    {
      id: "om_ac_box",
      title: "3. Tủ AC",
      icon: "Box",
      items: [
        { id: "om_3_1", label: "3.1. Chụp ảnh tổng quan và Đánh giá Tình trạng", type: "photo_status" },
        { id: "om_3_2", label: "3.2. Quét nhiệt tổng quan thiết bị hệ thống Tủ AC", type: "photo_status" },
        { id: "om_3_3", label: "3.3. Quét nhiệt Điểm đấu nối vào tủ MSB (≤45°C)", type: "photo_status" },
        { id: "om_3_4", label: "3.4. Siết lực điểm đấu nối MCB AC, DC, domino AC", type: "photo_status" },
        { id: "om_3_5", label: "3.5. Vệ sinh tủ AC - độ kín tủ AC", type: "photo_status" },
        { id: "om_3_6", label: "3.6. Độ kín đầu vào - đầu ra", type: "photo_status" }
      ]
    },
    {
      id: "om_inverter",
      title: "4. Inverter",
      icon: "Zap",
      items: [
        { id: "om_4_1", label: "4.1. Chụp ảnh tổng quan và Đánh giá Tình trạng", type: "photo_status" },
        { id: "om_4_2", label: "4.2. Kiểm tra Đèn báo tín hiệu và quạt tản nhiệt", type: "photo_status" },
        { id: "om_4_3", label: "4.3. Kiểm tra thoát nhiệt xung quanh inverter", type: "photo_status" },
        { id: "om_4_4", label: "4.4. Quét nhiệt hệ thống Inverter (≤ 45°C)", type: "photo_status" },
        { id: "om_4_5", label: "4.5. Quét nhiệt Box AC inverter (≤ 45°C)", type: "photo_status" },
        { id: "om_4_6", label: "4.6. Quét nhiệt đầu MC4 (≤ 45°C)", type: "photo_status" },
        { id: "om_4_7", label: "4.7. Vệ sinh Inverter & quạt tản nhiệt", type: "photo_status" },
        { id: "om_4_8", label: "4.8. Siết lực box AC inverter", type: "photo_status" },
        { id: "om_4_9", label: "4.9. Đo điện trở kết nối (Đánh giá dựa vào ảnh)", type: "photo_status", optional: true }
      ]
    },
    {
      id: "om_inv_ac",
      title: "5. Inverter / Tủ AC",
      icon: "Cpu",
      items: [
        { id: "om_5_1", label: "5.1. Đo điện trở cách điện string DC (Chụp ảnh thiết bị và đánh giá)", type: "photo_status" },
        { id: "om_5_2", label: "5.2. Đo điện trở nối đất (Chụp ảnh thiết bị và đánh giá)", type: "photo_status" },
        { id: "om_5_3", label: "5.3. Kết nối Mạng Lan", type: "photo_status" },
        { id: "om_5_4", label: "5.4. Kiểm tra thẩm mỹ tổng quan", type: "photo_status" }
      ]
    },
    {
      id: "om_cable",
      title: "6. Máng cáp, dây cáp AC - DC",
      icon: "ClipboardList",
      items: [
        { id: "om_6_1", label: "6.1. Kiểm tra độ kín đầu vào - đầu ra", type: "photo_status" },
        { id: "om_6_2", label: "6.2. Kiểm tra Dây cáp mương dẫn", type: "photo_status" }
      ]
    },
    {
      id: "om_frame",
      title: "7. Khung giá đỡ hệ thống pin mặt trời",
      icon: "Layers",
      items: [
        { id: "om_7_1", label: "7.1. Kiểm tra - chụp ảnh tổng quan & chi tiết", type: "photo_status" },
        { id: "om_7_2", label: "7.2. Siết lực ốc kẹp biên, kẹp giữa", type: "photo_status" },
        { id: "om_7_3", label: "7.3. Kiểm tra mối hàn liên kết", type: "photo_status", optional: true }
      ]
    },
    {
      id: "om_roof",
      title: "8. Kết Cấu Mái",
      icon: "Home",
      items: [
        { id: "om_8_1", label: "8.1. Kiểm tra độ võng của các vì kèo", type: "photo_status" },
        { id: "om_8_2", label: "8.2. Kiểm tra mái che chắc chắn (nếu có)", type: "photo_status", optional: true }
      ]
    }
  ]
};
