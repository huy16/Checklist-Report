export const omSchema = {
  generalInformation: {
    title: "Thông tin Dự án - O&M",
    fields: [
      { id: "om_projectName", label: "Tên dự án", type: "text" },
      { id: "om_managerContact", label: "Thông tin liên hệ Quản lý", type: "text" },
      { id: "om_siteLocation", label: "Vị trí dự án", type: "text" },
      { id: "om_inspectionDate", label: "Ngày kiểm tra", type: "date" },
      { id: "om_shopCode", label: "Mã shop", type: "text" }
    ]
  },
  categories: [
    {
      id: "om_dts",
      title: "1. Dây tín hiệu",
      items: [
        { id: "om_1.1", label: "Kiểm tra dây mạng và ăng-ten của công tơ", type: "photo" },
        { id: "om_1.2", label: "Kiểm tra dây CT (bọc dây, bảo vệ)", type: "photo" }
      ]
    },
    {
      id: "om_pv",
      title: "2. Hệ thống Pin mặt trời",
      items: [
        { id: "om_2.1", label: "Chụp ảnh tổng quan và Đánh giá Tình trạng", type: "photo" },
        { id: "om_2.2", label: "Kiểm tra quét nhiệt hệ thống Pin mặt trời (≤65°C)", type: "photo" },
        { id: "om_2.3", label: "Kiểm tra quét nhiệt MC4 (≤45°C)", type: "photo" },
        { id: "om_2.4", label: "Kiểm tra cố định MC4", type: "photo" },
        { id: "om_2.5", label: "Kiểm tra ống ruột gà đi dây cáp DC trên mái (tình trạng, độ kín)", type: "photo" }
      ]
    },
    {
      id: "om_ac_box",
      title: "3. Tủ AC",
      items: [
        { id: "om_3.1", label: "Chụp ảnh tổng quan và Đánh giá Tình trạng", type: "photo" },
        { id: "om_3.2", label: "Quét nhiệt tổng quan thiết bị hệ thống Tủ AC", type: "photo" },
        { id: "om_3.3", label: "Quét nhiệt Điểm đấu nối vào tủ MSB (≤45°C)", type: "photo" },
        { id: "om_3.4", label: "Siết lực điểm đấu nối MCB AC, DC, domino AC", type: "text" },
        { id: "om_3.5", label: "Vệ sinh tủ AC - độ kín tủ AC", type: "text" },
        { id: "om_3.6", label: "Độ kín đầu vào - đầu ra", type: "photo" }
      ]
    },
    {
      id: "om_inverter",
      title: "4. Inverter",
      items: [
        { id: "om_4.1", label: "Chụp ảnh tổng quan và Đánh giá Tình trạng", type: "photo" },
        { id: "om_4.2", label: "Kiểm tra Đèn báo tín hiệu và quạt tản nhiệt", type: "photo" },
        { id: "om_4.3", label: "Kiểm tra thoát nhiệt xung quanh inverter", type: "photo" },
        { id: "om_4.4", label: "Quét nhiệt hệ thống Inverter (≤ 45°C)", type: "photo" },
        { id: "om_4.5", label: "Quét nhiệt Box AC inverter (≤ 45°C)", type: "photo" },
        { id: "om_4.6", label: "Quét nhiệt đầu MC4 (≤ 45°C)", type: "photo" },
        { id: "om_4.7", label: "Vệ sinh Inverter & quạt tản nhiệt", type: "text" },
        { id: "om_4.8", label: "Siết lực box AC inverter", type: "photo" },
        { id: "om_4.9", label: "Đo điện trở kết nối", type: "text", optional: true }
      ]
    },
    {
      id: "om_inv_ac",
      title: "5. Inverter / Tủ AC",
      items: [
        { id: "om_5.1", label: "Đo điện trở cách điện string DC", type: "text" },
        { id: "om_5.2", label: "Đo điện trở nối đất", type: "text" },
        { id: "om_5.3", label: "Kết nối Mạng Lan", type: "photo" },
        { id: "om_5.4", label: "Kiểm tra thẩm mỹ tổng quan", type: "text" }
      ]
    },
    {
      id: "om_cable",
      title: "6. Máng cáp, dây cáp AC - DC",
      items: [
        { id: "om_6.1", label: "Kiểm tra độ kín đầu vào - đầu ra", type: "photo" },
        { id: "om_6.2", label: "Kiểm tra Dây cáp mương dẫn", type: "photo" }
      ]
    },
    {
      id: "om_frame",
      title: "7. Khung giá đỡ hệ thống pin mặt trời",
      items: [
        { id: "om_7.1", label: "Kiểm tra - chụp ảnh tổng quan & chi tiết", type: "photo" },
        { id: "om_7.2", label: "Siết lực ốc kẹp biên, kẹp giữa", type: "text" },
        { id: "om_7.3", label: "Kiểm tra mối hàn liên kết", type: "photo", optional: true }
      ]
    },
    {
      id: "om_roof",
      title: "8. Kết Cấu Mái",
      items: [
        { id: "om_8.1", label: "Kiểm tra độ võng của các vì kèo", type: "text" },
        { id: "om_8.2", label: "Kiểm tra mái che chắc chắn (nếu có)", type: "photo", optional: true }
      ]
    }
  ]
};
