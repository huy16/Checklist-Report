export const analyzeImagesMock = async (items, onProgress) => {
  const analyzedItems = [...items];
  const totalItems = analyzedItems.length;

  for (let i = 0; i < totalItems; i++) {
    // Simulate network delay per image
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onProgress(((i + 1) / totalItems) * 100, analyzedItems[i].title);
    
    // Randomly assign pass/fail for the mock (80% pass rate)
    const isPass = Math.random() > 0.2;
    
    let feedback = "";
    if (isPass) {
      feedback = "Không phát hiện lỗi. Tình trạng hoạt động bình thường.";
    } else {
      // Deterministic fake errors based on item id
      const errors = {
        '1': "Cảnh báo: Phát hiện nhiệt độ bất thường hoặc cảnh báo lỗi trên màn hình.",
        '2': "Lỗi: Đầu cos lỏng hoặc có dấu hiệu quá rỉ sét.",
        '3': "Lỗi: Quấn băng keo không đạt chuẩn trên dây DC.",
        '4': "Cảnh báo: Tấm pin bị che khuất một phần (bóng râm) hoặc có vật cản.",
        '5': "Lỗi: Thiếu kẹp bắt pin, kẹp lỏng lẻo.",
        '6': "Cảnh báo: Thông số dòng không ổn định.",
        '7': "Lỗi: Đầu MC4 bấm chưa khít, nguy cơ phóng điện arc.",
        '8': "Lỗi: Dây tiếp địa bị đứt hoặc chưa siết chặt.",
        '9': "Cảnh báo: Lớp bụi dày làm giảm hiệu suất >15%. Cần vệ sinh.",
        '10': "Cảnh báo: Mái có hiện tượng đọng nước khu vực lắp pin."
      };
      feedback = errors[analyzedItems[i].id] || "Phát hiện sự cố không xác định.";
    }

    analyzedItems[i].status = isPass ? 'pass' : 'fail';
    analyzedItems[i].aiFeedback = feedback;
  }

  // wait a bit before completing
  await new Promise(resolve => setTimeout(resolve, 500));
  return analyzedItems;
};
