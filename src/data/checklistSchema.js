export const checklistSchema = {
  generalInformation: {
    title: "Thông tin Dự án",
    fields: [
      { id: "projectName", label: "Tên dự án", type: "text" },
      { id: "siteLocation", label: "Vị trí dự án", type: "text" },
      { id: "completionDate", label: "Ngày hoàn thành lắp đặt", type: "date" }
    ]
  },
  categories: [
    {
      id: "roof",
      title: "A. Thông tin mái",
      icon: "Home",
      items: [
        { id: "id_1_1", label: "1.1. Ảnh tổng quan mái (quan sát được toàn bộ mái cửa hàng)", type: "photo" },
        { id: "id_1_2", label: "1.2. Ảnh tổng quan Panel (Ảnh cận cảnh quay nhìn rõ từng tấm pin kiểm tra panel lắp đặt)", type: "photo" },
        { id: "id_1_4", label: "1.4. Ảnh đường đi cáp DC từ trên xuống", type: "photo" },
        { id: "id_1_5", label: "1.5. Ảnh các cây cối gây che bóng (nếu có)", type: "photo", optional: true },
        { id: "id_1_6", label: "1.6. Ảnh các tòa nhà gây che bóng (nếu có)", type: "photo", optional: true },
        { id: "id_1_7", label: "1.7. Ảnh vị trí tiếp cận mái từ dưới lên", type: "photo" },
        { id: "id_1_8", label: "1.8. Ảnh chụp vị trí đấu nối hệ thống tiếp địa", type: "photo" }
      ]
    },
    {
      id: "equipment",
      title: "B. Thông tin thiết bị",
      icon: "Cpu",
      items: [
        { id: "id_2_1", label: "2.1. Ảnh chụp số Serial Number Inverter", type: "photo" },
        { id: "id_2_2", label: "2.2. Ảnh chụp số Serial Number Công tơ", type: "photo" },
        { id: "id_2_4", label: "2.4. Ảnh chụp số Serial Number Dongle/SmartLogger", type: "photo" }
      ]
    },
    {
      id: "electrical",
      title: "C. Thông tin phần điện",
      icon: "Zap",
      items: [
        { id: "id_3_1", label: "3.1. Ảnh đường đi cáp DC từ Pin trên mái về Inverter (đứng ở mặt đất)", type: "photo" },
        { id: "id_3_2_1", label: "3.2.1. Ảnh tổng quan vị trí lắp đặt tủ AC Solar", type: "photo" },
        { id: "id_3_2_2", label: "3.2.2. Ảnh tổng quan vị trí lắp đặt Inverter", type: "photo" },
        { id: "id_3_3", label: "3.3. Ảnh đường đi dây tiếp địa từ Inverter đến điểm đấu nối", type: "photo" },
        { id: "id_3_4_1", label: "3.4.1 Ảnh đường đi cáp AC giữa Tủ tổng và tủ AC Solar", type: "photo" },
        { id: "id_3_4_2a", label: "3.4.2 Ảnh tổng quan Tủ MSB (tủ đấu nối giữa cáp AC Solar và cửa hàng)", type: "photo" },
        { id: "id_3_4_2b", label: "3.4.2 Ảnh chi tiết tổng quan Tủ MSB (Ảnh mở cửa tủ)", type: "photo" },
        { id: "id_3_5", label: "3.5. Ảnh chi tiết vị trí đấu nối tại tủ MSB và cáp AC Solar", type: "photo" },
        { id: "id_3_6", label: "3.6. Ảnh tủ AC Solar chi tiết (mở cửa)", type: "photo" },
        { id: "id_3_7", label: "3.8. Ảnh tủ trung gian - tủ lắp Meter chi tiết (nếu có)", type: "photo", optional: true },
        { id: "id_3_8", label: "3.8. Ảnh chụp vị trí kẹp CT meter", type: "photo" }
      ]
    },
    {
      id: "communication",
      title: "D. Truyền thông",
      icon: "Wifi",
      items: [
        { id: "id_4_1", label: "4.1. Ảnh vị trí Tủ mạng của Cửa hàng", type: "photo" },
        { id: "id_4_3", label: "4.3. Ảnh chi tiết vị trí đấu nối cổng Ethernet", type: "photo" }
      ]
    },
    {
      id: "settings",
      title: "E. Cài đặt hệ thống",
      icon: "ClipboardList",
      items: [
        { id: "id_5_1", label: "5.1. Cài đặt nhanh cho inverter", type: "photo" },
        { id: "id_5_2", label: "5.2. Cài đặt thông số bảo vệ của Inverter", type: "photo" },
        { id: "id_5_3", label: "5.3. Cài đặt chế độ Zero Export", type: "photo" },
        { id: "id_5_3_1", label: "5.3.1. Chỉnh chế độ Limitation Mode: Single Phase", type: "photo" },
        { id: "id_5_3_2", label: "5.3.2. Bật chức năng Communication disconnection fail-safe", type: "photo" },
        { id: "id_5_4", label: "5.4. Cài đặt kết nối FE Connection cho Inverter", type: "photo" },
        { id: "id_5_5", label: "5.5. Thêm thiết bị Sdongle và Inverter vào hệ thống theo dõi Fusion Solar", type: "photo" },
        { id: "id_5_6", label: "5.6. Cài đặt thông số công suất lắp đặt của inverter", type: "photo" },
        { id: "id_5_7", label: "5.7. Kiểm tra theo dõi inverter theo thời gian thực sau khi cài đặt", type: "photo" }
      ]
    },
    {
      id: "documents",
      title: "F. Tài liệu",
      icon: "Layers",
      items: [
        { id: "id_6_1", label: "6.1. Bản vẽ Layout Final (Hướng đi cáp DC, AC, Inverter...)", type: "photo" },
        { id: "id_6_2", label: "6.2. Bản vẽ thiết kế đấu nối hệ thống DC và AC", type: "photo" }
      ]
    },
    {
      id: "storeInfo",
      title: "G. Thông tin cửa hàng",
      icon: "Box",
      items: [
        { id: "7", label: "7. Tên/SĐT Nhân viên XDBT", type: "text" },
        { id: "8", label: "8. Tên/SĐT Phụ trách khu vực XDBT", type: "text" }
      ]
    }
  ]
};
