import { Article } from '@/types/news';

// Interface cho dữ liệu tin tức
export interface NewsData {
  home: Article[];
  'thoi-su': Article[];
  'the-gioi': Article[];
  'kinh-doanh': Article[];
  'giai-tri': Article[];
  'the-thao': Article[];
  'phap-luat': Article[];
  'suc-khoe': Article[];
  'doi-song': Article[];
  'so-hoa': Article[];
  'bat-dong-san'?: Article[];
  'giao-duc'?: Article[];
  [key: string]: Article[] | undefined;
}

// Dữ liệu cứng đã cào từ VNExpress - cập nhật định kỳ hoặc khi build
export const staticNewsData: NewsData = {
  home: [
    {
      id: '4989661',
      title: 'Hai cao tốc qua Lâm Đồng ngập, sạt lở, phải đóng đường',
      description: 'Mưa lớn kéo dài, cao tốc Dầu Giây - Phan Thiết và Vĩnh Hảo - Phan Thiết ngập nước và sạt lở, cơ quan chức năng tạm đóng đường để đảm bảo an toàn giao thông.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/cao-toc-dau-giay-ngap-cuc-bo-1-8722-4776-1764825874.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=XJ1gwuAxYgAZt6NP6kOQDw',
      url: 'https://vnexpress.net/hai-cao-toc-qua-lam-dong-ngap-sat-lo-phai-dong-duong-4989661.html',
      category: 'Thời sự',
      publishedAt: '1764825918'
    },
    {
      id: '4989720',
      title: 'Cư dân chia phe vì chung cư cấm xe điện',
      description: 'Mấy ngày qua, gia đình chị Kiều Oanh ở chung cư HH Linh Đàm, phường Hoàng Liệt đau đầu tìm chỗ gửi xe điện khi ban quản lý thông báo sẽ cấm phương tiện này.',
      thumbnail: 'https://i1-giadinh.vnecdn.net/2025/12/04/xe-dien-2-1764832349-176483236-4083-6929-1764832403.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=R1I6QQMFcG7j0htw3B_SpA',
      url: 'https://vnexpress.net/cu-dan-chia-phe-vi-chung-cu-cam-xe-dien-4989720.html',
      category: 'Đời sống',
      publishedAt: '1764832439'
    },
    {
      id: '4989667',
      title: "'Cấm xe máy xăng vào vành đai 1 Hà Nội từ tháng 7/2026 là quá gấp'",
      description: 'Đại diện Grab cùng nhà sản xuất xe điện Selex Motors cho rằng thời hạn cấm xe máy xăng vào vành đai 1 của Hà Nội từ tháng 7/2026 là quá gấp, khi hạ tầng chưa sẵn sàng.',
      thumbnail: 'https://i1-kinhdoanh.vnecdn.net/2025/12/04/2-jpg-7962-1764157482-17647655-7069-7134-1764820100.png?w=680&h=408&q=100&dpr=1&fit=crop&s=2JssSbGDPrrDCYeW3bQbzw',
      url: 'https://vnexpress.net/cam-xe-may-xang-vao-vanh-dai-1-ha-noi-tu-thang-7-2026-la-qua-gap-4989667.html',
      category: 'Kinh doanh',
      publishedAt: '1764832896'
    },
    {
      id: '4989739',
      title: 'Hàng chục tàu cá bị nhấn chìm và cuốn trôi ở Lâm Đồng',
      description: 'Dòng nước từ thượng nguồn đổ về đột ngột khiến 13 tàu cá bị nhấn chìm, 25 tàu khác đang neo đậu tại cửa biển Liên Hương bị cuốn trôi, sáng 4/12.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/Sequence03-1764829426-3086-1764829430.gif?w=680&h=408&q=100&dpr=1&fit=crop&s=-bB6BFT-_jKsXtPOByOX4w&t=image',
      url: 'https://vnexpress.net/hang-chuc-tau-ca-bi-nhan-chim-va-cuon-troi-o-lam-dong-4989739.html',
      category: 'Thời sự',
      publishedAt: '1764832160'
    },
    {
      id: '4989430',
      title: "'Thanh niên ngã thì đứng dậy, không sợ thất bại'",
      description: 'Bộ trưởng Khoa học và Công nghệ Nguyễn Mạnh Hùng cho rằng thanh niên với nhiều năng lượng, khát vọng, không sợ thất bại, nên nhận việc khó, đi đầu đấu tranh với cái xấu, và ngã thì đứng dậy.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/03/bt-jpeg-1764772050-1764772076-2430-1764772171.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=JE6m9Yn0Q2EG228-khdfMg',
      url: 'https://vnexpress.net/thanh-nien-nga-thi-dung-day-khong-so-that-bai-4989430.html',
      category: 'Thời sự',
      publishedAt: '1764802800'
    },
    {
      id: '4989758',
      title: 'Giá xăng lên gần 20.500 đồng một lít',
      description: 'Giá xăng tăng, dầu giảm từ 15h hôm nay, sau điều chỉnh của liên Bộ Công Thương - Tài chính.',
      thumbnail: 'https://i1-kinhdoanh.vnecdn.net/2025/12/04/xang68-1764831079-1764831107-4383-1764831519.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=_oOEyiZP12RZ9wC8Ei4JcQ',
      url: 'https://vnexpress.net/gia-xang-moi-nhat-hom-nay-4-12-4989758.html',
      category: 'Kinh doanh',
      publishedAt: '1764834613'
    },
    {
      id: '4989507',
      title: 'Thái Lan đối mặt kỳ SEA Games bất ổn',
      description: 'Công tác chuẩn bị bất cập, thiếu minh bạch tài chính cùng một số vấn đề chính trị khiến Thái Lan đối mặt nhiều hoài nghi về khả năng tổ chức SEA Games 33.',
      thumbnail: 'https://i1-thethao.vnecdn.net/2025/12/04/2aJPG1764660142-1764791470-6369-1764791910.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=GTiCf7LwjFq9OZ6TLGfl_A',
      url: 'https://vnexpress.net/thai-lan-doi-mat-ky-sea-games-bat-on-4989507.html',
      category: 'Thể thao',
      publishedAt: '1764791910'
    },
    {
      id: '4989259',
      title: "Tài xế 'mòn mỏi' chờ bằng lái xe bản cứng",
      description: 'Nhiều tài xế đổi hoặc thi lấy giấy phép lái xe nhiều tháng nhưng chưa nhận được thẻ PET (thẻ nhựa) khiến quá trình xin việc và làm một số thủ tục gặp khó.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/03/9-1764740256-8050-1764740307.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=QMXFuFz36O2wA5-x20H6DQ',
      url: 'https://vnexpress.net/tai-xe-mon-moi-cho-bang-lai-xe-ban-cung-4989259.html',
      category: 'Thời sự',
      publishedAt: '1764740307'
    },
    {
      id: '4989713',
      title: "'Bác sĩ nội trú và chuyên khoa I, II không phải văn bằng thạc sĩ, tiến sĩ'",
      description: 'Chính phủ khẳng định các chương trình bác sĩ nội trú, chuyên khoa I, II là đào tạo chuyên sâu đặc thù do Bộ Y tế quản lý, không phải văn bằng thạc sĩ hay tiến sĩ theo hệ thống giáo dục quốc dân.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/233a5270-1764826200-1280-1764826306.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=TBryuv5LAVPrYXlgRiHLsw',
      url: 'https://vnexpress.net/bac-si-noi-tru-va-chuyen-khoa-i-ii-khong-phai-van-bang-thac-si-tien-si-4989713.html',
      category: 'Sức khỏe',
      publishedAt: '1764826306'
    },
    {
      id: '4989665',
      title: 'Đường trung tâm TP HCM được làm mới diện mạo trước Tết',
      description: 'Đại lộ Lê Lợi dài khoảng một km ở trung tâm TP HCM sẽ được sơn mới mặt tiền, lát đá granite vỉa hè và dải phân cách, tạo diện mạo khang trang trước Tết.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/dji076616796644761679664538366-7376-9922-1764820204.webp?w=220&h=132&q=100&dpr=1&fit=crop&s=TBRhaDu_LiQqB6sRJBiBhA',
      url: 'https://vnexpress.net/duong-trung-tam-tp-hcm-duoc-lam-moi-dien-mao-truoc-tet-4989665.html',
      category: 'Thời sự',
      publishedAt: '1764820204'
    },
    {
      id: '4989733',
      title: 'Nguyên Bộ trưởng Khoa học và Công nghệ Chu Tuấn Nhạ qua đời',
      description: 'GS.TS Chu Tuấn Nhạ, nguyên Bộ trưởng Khoa học và Công nghệ, qua đời ngày 1/12, hưởng thọ 87 tuổi, sau thời gian dài lâm bệnh nặng.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/IMG5798-1764828716-8332-1764828726.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=ZLiqQl0fiSgX0eM801cLpw',
      url: 'https://vnexpress.net/nguyen-bo-truong-khoa-hoc-va-cong-nghe-chu-tuan-nha-qua-doi-4989733.html',
      category: 'Thời sự',
      publishedAt: '1764828726'
    },
    {
      id: '4989636',
      title: 'Biển Đông có thể sắp xuất hiện bão số 16',
      description: 'Một áp thấp nhiệt đới đang hoạt động phía đông Philippines dự kiến 2-3 ngày tới đi vào Biển Đông và có thể mạnh lên thành bão.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/anh-chup-man-hinh-2025-12-04-l-4817-7580-1764818271.png?w=220&h=132&q=100&dpr=1&fit=crop&s=ZltJ6DrJIzdNMLWj99GE3Q',
      url: 'https://vnexpress.net/bien-dong-co-the-sap-xuat-hien-bao-so-16-4989636.html',
      category: 'Thời sự',
      publishedAt: '1764818271'
    }
  ],
  'thoi-su': [
    {
      id: '4989661',
      title: 'Hai cao tốc qua Lâm Đồng ngập, sạt lở, phải đóng đường',
      description: 'Mưa lớn kéo dài, cao tốc Dầu Giây - Phan Thiết và Vĩnh Hảo - Phan Thiết ngập nước và sạt lở, cơ quan chức năng tạm đóng đường để đảm bảo an toàn giao thông.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/cao-toc-dau-giay-ngap-cuc-bo-1-8722-4776-1764825874.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=XJ1gwuAxYgAZt6NP6kOQDw',
      url: 'https://vnexpress.net/hai-cao-toc-qua-lam-dong-ngap-sat-lo-phai-dong-duong-4989661.html',
      category: 'Thời sự',
      publishedAt: '1764825918'
    },
    {
      id: '4989739',
      title: 'Hàng chục tàu cá bị nhấn chìm và cuốn trôi ở Lâm Đồng',
      description: 'Dòng nước từ thượng nguồn đổ về đột ngột khiến 13 tàu cá bị nhấn chìm, 25 tàu khác đang neo đậu tại cửa biển Liên Hương bị cuốn trôi.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/Sequence03-1764829426-3086-1764829430.gif?w=680&h=408&q=100&dpr=1&fit=crop&s=-bB6BFT-_jKsXtPOByOX4w&t=image',
      url: 'https://vnexpress.net/hang-chuc-tau-ca-bi-nhan-chim-va-cuon-troi-o-lam-dong-4989739.html',
      category: 'Thời sự',
      publishedAt: '1764832160'
    },
    {
      id: '4989726',
      title: 'Hồ thủy lợi xả lũ gây ngập hơn 1.000 hộ dân',
      description: 'Hồ Lòng Sông xả lũ gây ngập hơn 1.000 hộ dân, cuốn trôi hàng chục tàu thuyền tại xã Liên Hương (Tuy Phong, Bình Thuận cũ).',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/untitled-1764833996-1764834033-5501-6669-1764834138.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=Vu9h96vUKXJiDaRz3Ms-RA',
      url: 'https://vnexpress.net/ho-thuy-loi-xa-lu-gay-ngap-hon-1-000-ho-dan-4989726.html',
      category: 'Thời sự',
      publishedAt: '1764834138'
    },
    {
      id: '4989636',
      title: 'Biển Đông có thể sắp xuất hiện bão số 16',
      description: 'Một áp thấp nhiệt đới đang hoạt động phía đông Philippines dự kiến 2-3 ngày tới đi vào Biển Đông và có thể mạnh lên thành bão.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/anh-chup-man-hinh-2025-12-04-l-4817-7580-1764818271.png?w=220&h=132&q=100&dpr=1&fit=crop&s=ZltJ6DrJIzdNMLWj99GE3Q',
      url: 'https://vnexpress.net/bien-dong-co-the-sap-xuat-hien-bao-so-16-4989636.html',
      category: 'Thời sự',
      publishedAt: '1764818271'
    },
    {
      id: '4989665',
      title: 'Đường trung tâm TP HCM được làm mới diện mạo trước Tết',
      description: 'Đại lộ Lê Lợi dài khoảng một km ở trung tâm TP HCM sẽ được sơn mới mặt tiền, lát đá granite vỉa hè và dải phân cách.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/dji076616796644761679664538366-7376-9922-1764820204.webp?w=220&h=132&q=100&dpr=1&fit=crop&s=TBRhaDu_LiQqB6sRJBiBhA',
      url: 'https://vnexpress.net/duong-trung-tam-tp-hcm-duoc-lam-moi-dien-mao-truoc-tet-4989665.html',
      category: 'Thời sự',
      publishedAt: '1764820204'
    }
  ],
  'the-gioi': [
    {
      id: '4989510',
      title: "Ông Trump: 'Ông Putin muốn chấm dứt chiến sự Ukraine'",
      description: 'Tổng thống Trump tin người đồng cấp Nga Putin muốn chấm dứt chiến sự Ukraine, sau khi hai đại diện đàm phán Mỹ đến Moskva gặp ông chủ điện Kremlin.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/afp-20251203-86zn9k8-v1-highre-7667-5957-1764804387.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=PwGQVOyBaBze-sNIQijC0A',
      url: 'https://vnexpress.net/ong-trump-ong-putin-muon-cham-dut-chien-su-ukraine-4989510.html',
      category: 'Thế giới',
      publishedAt: '1764804387'
    },
    {
      id: '4989052',
      title: '18 tháng Nga bóp nghẹt thành trì Pokrovsk của Ukraine',
      description: 'Sau 18 tháng Nga siết vòng vây, thành phố chiến lược Pokrovsk đã biến thành đống nổ nát, hoang tàn đến mức mất cả vế thế chiến lược từng có.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/03/afp-20250326-37yp69d-v1-highre-6884-1676-1764745616.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=G55WVLpO0EAyq5nOGPYSew',
      url: 'https://vnexpress.net/18-thang-nga-bop-nghet-thanh-tri-pokrovsk-cua-ukraine-4989052.html',
      category: 'Thế giới',
      publishedAt: '1764745616'
    },
    {
      id: '4989443',
      title: 'Tên lửa tái sử dụng của Trung Quốc bốc cháy khi thử hạ cánh',
      description: 'Tên lửa Zhuque-3 mang tải trọng mô phỏng lên quỹ đạo Trái Đất thấp, nhưng khi tầng một tách ra và quay về sa mạc Gobi để thử hạ cánh thì bất ngờ bốc cháy.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/03/20251203180314-1764759857-9973-1764759892.gif?w=220&h=132&q=100&dpr=1&fit=crop&s=76AYtxWfTjWSOFB3v_K_Fw&t=image',
      url: 'https://vnexpress.net/ten-lua-tai-su-dung-cua-trung-quoc-boc-chay-khi-thu-ha-canh-4989443.html',
      category: 'Thế giới',
      publishedAt: '1764759892'
    },
    {
      id: '4989507',
      title: 'Thái Lan đối mặt kỳ SEA Games bất ổn',
      description: 'Công tác chuẩn bị bất cập, thiếu minh bạch tài chính cùng một số vấn đề chính trị khiến Thái Lan đối mặt nhiều hoài nghi về khả năng tổ chức SEA Games 33.',
      thumbnail: 'https://i1-thethao.vnecdn.net/2025/12/04/2aJPG1764660142-1764791470-6369-1764791910.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=GTiCf7LwjFq9OZ6TLGfl_A',
      url: 'https://vnexpress.net/thai-lan-doi-mat-ky-sea-games-bat-on-4989507.html',
      category: 'Thế giới',
      publishedAt: '1764791910'
    },
    {
      id: '4989495',
      title: 'Mưa lớn gây sạt lở nhiều đèo ở Lâm Đồng',
      description: 'Mưa lớn kéo dài khiến đèo Mimosa, Gia Bắc, D\'ran bị sạt lở, đất đá tràn xuống đường; quốc lộ 20 và 28 tê liệt, nhiều ôtô mắc kẹt.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/362bf7f4-5727-4862-85df-7d26fa-5093-8333-1764812714.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=2Bo1Yt0CLCYC3Ay9zADWZg',
      url: 'https://vnexpress.net/mua-lon-gay-sat-lo-nhieu-deo-o-lam-dong-4989495.html',
      category: 'Thế giới',
      publishedAt: '1764812714'
    }
  ],
  'kinh-doanh': [
    {
      id: '4989758',
      title: 'Giá xăng lên gần 20.500 đồng một lít',
      description: 'Giá xăng tăng, dầu giảm từ 15h hôm nay, sau điều chỉnh của liên Bộ Công Thương - Tài chính.',
      thumbnail: 'https://i1-kinhdoanh.vnecdn.net/2025/12/04/xang68-1764831079-1764831107-4383-1764831519.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=_oOEyiZP12RZ9wC8Ei4JcQ',
      url: 'https://vnexpress.net/gia-xang-moi-nhat-hom-nay-4-12-4989758.html',
      category: 'Kinh doanh',
      publishedAt: '1764834613'
    },
    {
      id: '4989667',
      title: "'Cấm xe máy xăng vào vành đai 1 Hà Nội từ tháng 7/2026 là quá gấp'",
      description: 'Đại diện Grab cùng nhà sản xuất xe điện Selex Motors cho rằng thời hạn cấm xe máy xăng vào vành đai 1 của Hà Nội từ tháng 7/2026 là quá gấp.',
      thumbnail: 'https://i1-kinhdoanh.vnecdn.net/2025/12/04/2-jpg-7962-1764157482-17647655-7069-7134-1764820100.png?w=680&h=408&q=100&dpr=1&fit=crop&s=2JssSbGDPrrDCYeW3bQbzw',
      url: 'https://vnexpress.net/cam-xe-may-xang-vao-vanh-dai-1-ha-noi-tu-thang-7-2026-la-qua-gap-4989667.html',
      category: 'Kinh doanh',
      publishedAt: '1764832896'
    },
    {
      id: '4989173',
      title: 'Làn sóng trả mặt bằng nhà phố cuối năm',
      description: 'Vào mùa mua sắm cuối năm song chủ mặt bằng nhà phố liên tiếp treo biển tìm khách thuê, thậm chí chấp nhận giảm giá 10-20%.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/03/img-8207-1764732939-1764732973-6104-4472-1764736485.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=C2HpRA50Q-tJmzYm6Uecsw',
      url: 'https://vnexpress.net/lan-song-tra-mat-bang-nha-pho-cuoi-nam-4989173.html',
      category: 'Kinh doanh',
      publishedAt: '1764736485'
    },
    {
      id: '4989259',
      title: "Tài xế 'mòn mỏi' chờ bằng lái xe bản cứng",
      description: 'Nhiều tài xế đổi hoặc thi lấy giấy phép lái xe nhiều tháng nhưng chưa nhận được thẻ PET khiến quá trình xin việc gặp khó.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/03/9-1764740256-8050-1764740307.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=QMXFuFz36O2wA5-x20H6DQ',
      url: 'https://vnexpress.net/tai-xe-mon-moi-cho-bang-lai-xe-ban-cung-4989259.html',
      category: 'Kinh doanh',
      publishedAt: '1764740307'
    },
    {
      id: '4989155',
      title: 'Người Phú Quốc ngày ngủ, đêm thức vì mất điện',
      description: '22h đêm, đèn vừa bật sáng chị Nguyễn Thảo Nguyên, 33 tuổi, ở phường Dương Đông bật dậy, đeo tạp dề lao vào bếp.',
      thumbnail: 'https://i1-giadinh.vnecdn.net/2025/12/03/588370945-122153584778700372-2-2986-5533-1764780579.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=nd94XFcIRVmPWGgv654y7A',
      url: 'https://vnexpress.net/nguoi-phu-quoc-ngay-ngu-dem-thuc-vi-mat-dien-4989155.html',
      category: 'Kinh doanh',
      publishedAt: '1764780579'
    }
  ],
  'giai-tri': [
    {
      id: '4988675',
      title: "'Nỗi buồn chiến tranh là tiểu thuyết đáng vinh danh'",
      description: 'Sau lễ vinh danh 50 tác phẩm văn học, nghệ thuật ở Hà Nội, có ý kiến đòi thu hồi quyết định và xử lý "Nỗi buồn chiến tranh" của Bảo Ninh.',
      thumbnail: 'https://i1-giaitri.vnecdn.net/2025/12/02/bao-ninh-2-1764664247-17646651-3513-4728-1764665446.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=fDSog27COVrOVox5JvTM-g',
      url: 'https://vnexpress.net/noi-buon-chien-tranh-la-tieu-thuyet-dang-vinh-danh-4988675.html',
      category: 'Giải trí',
      publishedAt: '1764665446'
    },
    {
      id: '4989304',
      title: 'Những kỷ lục của Việt Nam tại SEA Games',
      description: 'Ngoài số HC vàng nhiều nhất trong một kỳ SEA Games, Việt Nam còn giữ các kỷ lục ở điền kinh nữ, vật, wushu, cờ hay bóng đá nữ.',
      thumbnail: 'https://i1-thethao.vnecdn.net/2025/12/03/3-1764744904.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=51elU_XlujBVAdBXyUP07Q',
      url: 'https://vnexpress.net/nhung-ky-luc-cua-viet-nam-tai-sea-games-4989304.html',
      category: 'Giải trí',
      publishedAt: '1764744904'
    },
    {
      id: '4988807',
      title: 'Điều gì giúp Hà Nội đón lượng khách cao nhất lịch sử?',
      description: 'Sự kiện 80 năm Quốc khánh, chính sách visa nới lỏng kết hợp các sản phẩm mới là các lý do chính giúp Hà Nội đột phá trong việc hút khách du lịch ghé thăm năm 2025.',
      thumbnail: 'https://i1-dulich.vnecdn.net/2025/12/02/dsc-2095-1764668642-1764668666-2070-1764668807.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=S8YY2k1JS8EF3y0nG7Ay4g',
      url: 'https://vnexpress.net/dieu-gi-giup-ha-noi-don-luong-khach-cao-nhat-lich-su-4988807.html',
      category: 'Giải trí',
      publishedAt: '1764668807'
    },
    {
      id: '4989642',
      title: 'Thí sinh Hà Nội bị thu hồi bằng tốt nghiệp THPT sau nửa năm thi',
      description: 'Một cựu học sinh trường THPT Đan Phượng bị hủy kết quả, thu hồi bằng vì gian lận, sau gần nửa năm diễn ra kỳ thi tốt nghiệp.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/233a8097-1764818605-1764818626-8746-1764818857.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=PGfMwahFcb-IEeJZhQDvqA',
      url: 'https://vnexpress.net/hy-huu-mot-thi-sinh-o-ha-noi-bi-thu-hoi-bang-tot-nghiep-thpt-4989642.html',
      category: 'Giáo dục',
      publishedAt: '1764818857'
    },
    {
      id: '4989430',
      title: "'Thanh niên ngã thì đứng dậy, không sợ thất bại'",
      description: 'Bộ trưởng Khoa học và Công nghệ Nguyễn Mạnh Hùng cho rằng thanh niên với nhiều năng lượng, khát vọng, không sợ thất bại.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/03/bt-jpeg-1764772050-1764772076-2430-1764772171.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=JE6m9Yn0Q2EG228-khdfMg',
      url: 'https://vnexpress.net/thanh-nien-nga-thi-dung-day-khong-so-that-bai-4989430.html',
      category: 'Giải trí',
      publishedAt: '1764802800'
    }
  ],
  'the-thao': [
    {
      id: '4989507',
      title: 'Thái Lan đối mặt kỳ SEA Games bất ổn',
      description: 'Công tác chuẩn bị bất cập, thiếu minh bạch tài chính cùng một số vấn đề chính trị khiến Thái Lan đối mặt nhiều hoài nghi về khả năng tổ chức SEA Games 33.',
      thumbnail: 'https://i1-thethao.vnecdn.net/2025/12/04/2aJPG1764660142-1764791470-6369-1764791910.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=GTiCf7LwjFq9OZ6TLGfl_A',
      url: 'https://vnexpress.net/thai-lan-doi-mat-ky-sea-games-bat-on-4989507.html',
      category: 'Thể thao',
      publishedAt: '1764791910'
    },
    {
      id: '4989482',
      title: 'Bàn thắng của Đình Bắc có đúng luật?',
      description: 'So với các bàn thắng gây tranh cãi vì lý do cầu thủ của đội tấn công ở vị trí việt vị gây cản trở tầm nhìn thủ môn, pha ấn định tỷ số 2-1 của Nguyễn Đình Bắc trước Lào dễ dàng được các trọng tài công nhận hơn.',
      thumbnail: 'https://i1-thethao.vnecdn.net/2025/12/04/3db15664148c49ba89e3ef20c83911-1721-8046-1764810204.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=4QlGdd9u4EK4idLesdwfdA',
      url: 'https://vnexpress.net/ban-thang-cua-dinh-bac-co-dung-luat-4989482.html',
      category: 'Thể thao',
      publishedAt: '1764810204'
    },
    {
      id: '4989304',
      title: 'Những kỷ lục của Việt Nam tại SEA Games',
      description: 'Ngoài số HC vàng nhiều nhất trong một kỳ SEA Games, Việt Nam còn giữ các kỷ lục ở điền kinh nữ, vật, wushu, cờ hay bóng đá nữ.',
      thumbnail: 'https://i1-thethao.vnecdn.net/2025/12/03/3-1764744904.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=51elU_XlujBVAdBXyUP07Q',
      url: 'https://vnexpress.net/nhung-ky-luc-cua-viet-nam-tai-sea-games-4989304.html',
      category: 'Thể thao',
      publishedAt: '1764744904'
    },
    {
      id: '4989720',
      title: 'Cư dân chia phe vì chung cư cấm xe điện',
      description: 'Mấy ngày qua, gia đình chị Kiều Oanh ở chung cư HH Linh Đàm đau đầu tìm chỗ gửi xe điện khi ban quản lý thông báo sẽ cấm.',
      thumbnail: 'https://i1-giadinh.vnecdn.net/2025/12/04/xe-dien-2-1764832349-176483236-4083-6929-1764832403.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=R1I6QQMFcG7j0htw3B_SpA',
      url: 'https://vnexpress.net/cu-dan-chia-phe-vi-chung-cu-cam-xe-dien-4989720.html',
      category: 'Thể thao',
      publishedAt: '1764832439'
    },
    {
      id: '4988913',
      title: 'Bức xúc vì tiếng ồn sân pickleball',
      description: 'Chỉ tay sang sân pickleball đối diện nhà ở phố Hoàng Ngân, Hà Nội, chị Ngọc Lan ví âm thanh phát ra từ đó là "bản giao hưởng hỗn loạn".',
      thumbnail: 'https://i1-giadinh.vnecdn.net/2025/12/04/pick-1-1764809766-1764809832-9636-1764809840.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=kZRRpprKaea1hmb-yz-z7w',
      url: 'https://vnexpress.net/buc-xuc-vi-tieng-on-san-pickleball-4988913.html',
      category: 'Thể thao',
      publishedAt: '1764809840'
    }
  ],
  'phap-luat': [
    {
      id: '4989250',
      title: 'Vụ chiếm gần 5.800 m2 đất, xây trái phép 48 căn nhà diễn ra thế nào',
      description: 'Ông Lê Văn Hoàng bị cáo buộc bất chấp các quyết định của cơ quan nhà nước, chiếm đoạt gần 5.800 m2 đất của người khác, xây trái phép 42 căn nhà và 2 dãy nhà trọ.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/03/83b8469d09d68688dfc7-176475260-6552-2615-1764753031.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=rIYCJAPIAT8UnOIj2Z8aYg',
      url: 'https://vnexpress.net/vu-chiem-gan-5-800-m2-dat-xay-trai-phep-48-can-nha-dien-ra-the-nao-4989250.html',
      category: 'Pháp luật',
      publishedAt: '1764753031'
    },
    {
      id: '4989642',
      title: 'Thí sinh Hà Nội bị thu hồi bằng tốt nghiệp THPT sau nửa năm thi',
      description: 'Một cựu học sinh trường THPT Đan Phượng bị hủy kết quả, thu hồi bằng vì gian lận.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/233a8097-1764818605-1764818626-8746-1764818857.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=PGfMwahFcb-IEeJZhQDvqA',
      url: 'https://vnexpress.net/hy-huu-mot-thi-sinh-o-ha-noi-bi-thu-hoi-bang-tot-nghiep-thpt-4989642.html',
      category: 'Pháp luật',
      publishedAt: '1764818857'
    },
    {
      id: '4989713',
      title: "'Bác sĩ nội trú và chuyên khoa I, II không phải văn bằng thạc sĩ, tiến sĩ'",
      description: 'Chính phủ khẳng định các chương trình bác sĩ nội trú, chuyên khoa I, II là đào tạo chuyên sâu đặc thù do Bộ Y tế quản lý.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/233a5270-1764826200-1280-1764826306.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=TBryuv5LAVPrYXlgRiHLsw',
      url: 'https://vnexpress.net/bac-si-noi-tru-va-chuyen-khoa-i-ii-khong-phai-van-bang-thac-si-tien-si-4989713.html',
      category: 'Pháp luật',
      publishedAt: '1764826306'
    },
    {
      id: '4989733',
      title: 'Nguyên Bộ trưởng Khoa học và Công nghệ Chu Tuấn Nhạ qua đời',
      description: 'GS.TS Chu Tuấn Nhạ, nguyên Bộ trưởng Khoa học và Công nghệ, qua đời ngày 1/12, hưởng thọ 87 tuổi.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/IMG5798-1764828716-8332-1764828726.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=ZLiqQl0fiSgX0eM801cLpw',
      url: 'https://vnexpress.net/nguyen-bo-truong-khoa-hoc-va-cong-nghe-chu-tuan-nha-qua-doi-4989733.html',
      category: 'Pháp luật',
      publishedAt: '1764828726'
    },
    {
      id: '4989430',
      title: "'Thanh niên ngã thì đứng dậy, không sợ thất bại'",
      description: 'Bộ trưởng Khoa học và Công nghệ Nguyễn Mạnh Hùng chia sẻ tại Đại hội đại biểu Đoàn.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/03/bt-jpeg-1764772050-1764772076-2430-1764772171.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=JE6m9Yn0Q2EG228-khdfMg',
      url: 'https://vnexpress.net/thanh-nien-nga-thi-dung-day-khong-so-that-bai-4989430.html',
      category: 'Pháp luật',
      publishedAt: '1764802800'
    }
  ],
  'suc-khoe': [
    {
      id: '4989713',
      title: "'Bác sĩ nội trú và chuyên khoa I, II không phải văn bằng thạc sĩ, tiến sĩ'",
      description: 'Chính phủ khẳng định các chương trình bác sĩ nội trú, chuyên khoa I, II là đào tạo chuyên sâu đặc thù do Bộ Y tế quản lý, không phải văn bằng thạc sĩ hay tiến sĩ theo hệ thống giáo dục quốc dân.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/233a5270-1764826200-1280-1764826306.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=TBryuv5LAVPrYXlgRiHLsw',
      url: 'https://vnexpress.net/bac-si-noi-tru-va-chuyen-khoa-i-ii-khong-phai-van-bang-thac-si-tien-si-4989713.html',
      category: 'Sức khỏe',
      publishedAt: '1764826306'
    },
    {
      id: '4988913',
      title: 'Bức xúc vì tiếng ồn sân pickleball',
      description: 'Chỉ tay sang sân pickleball đối diện nhà ở phố Hoàng Ngân, Hà Nội, chị Ngọc Lan ví âm thanh phát ra từ đó là "bản giao hưởng hỗn loạn" kéo dài 20 tiếng mỗi ngày.',
      thumbnail: 'https://i1-giadinh.vnecdn.net/2025/12/04/pick-1-1764809766-1764809832-9636-1764809840.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=kZRRpprKaea1hmb-yz-z7w',
      url: 'https://vnexpress.net/buc-xuc-vi-tieng-on-san-pickleball-4988913.html',
      category: 'Sức khỏe',
      publishedAt: '1764809840'
    },
    {
      id: '4989720',
      title: 'Cư dân chia phe vì chung cư cấm xe điện',
      description: 'Mấy ngày qua, gia đình chị Kiều Oanh ở chung cư HH Linh Đàm đau đầu tìm chỗ gửi xe điện.',
      thumbnail: 'https://i1-giadinh.vnecdn.net/2025/12/04/xe-dien-2-1764832349-176483236-4083-6929-1764832403.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=R1I6QQMFcG7j0htw3B_SpA',
      url: 'https://vnexpress.net/cu-dan-chia-phe-vi-chung-cu-cam-xe-dien-4989720.html',
      category: 'Sức khỏe',
      publishedAt: '1764832439'
    },
    {
      id: '4989155',
      title: 'Người Phú Quốc ngày ngủ, đêm thức vì mất điện',
      description: '22h đêm, đèn vừa bật sáng chị Nguyễn Thảo Nguyên, 33 tuổi, ở phường Dương Đông bật dậy, đeo tạp dề lao vào bếp.',
      thumbnail: 'https://i1-giadinh.vnecdn.net/2025/12/03/588370945-122153584778700372-2-2986-5533-1764780579.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=nd94XFcIRVmPWGgv654y7A',
      url: 'https://vnexpress.net/nguoi-phu-quoc-ngay-ngu-dem-thuc-vi-mat-dien-4989155.html',
      category: 'Sức khỏe',
      publishedAt: '1764780579'
    },
    {
      id: '4989733',
      title: 'Nguyên Bộ trưởng Khoa học và Công nghệ Chu Tuấn Nhạ qua đời',
      description: 'GS.TS Chu Tuấn Nhạ, nguyên Bộ trưởng Khoa học và Công nghệ, qua đời ngày 1/12, hưởng thọ 87 tuổi.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/IMG5798-1764828716-8332-1764828726.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=ZLiqQl0fiSgX0eM801cLpw',
      url: 'https://vnexpress.net/nguyen-bo-truong-khoa-hoc-va-cong-nghe-chu-tuan-nha-qua-doi-4989733.html',
      category: 'Sức khỏe',
      publishedAt: '1764828726'
    }
  ],
  'doi-song': [
    {
      id: '4989720',
      title: 'Cư dân chia phe vì chung cư cấm xe điện',
      description: 'Mấy ngày qua, gia đình chị Kiều Oanh ở chung cư HH Linh Đàm, phường Hoàng Liệt đau đầu tìm chỗ gửi xe điện khi ban quản lý thông báo sẽ cấm phương tiện này.',
      thumbnail: 'https://i1-giadinh.vnecdn.net/2025/12/04/xe-dien-2-1764832349-176483236-4083-6929-1764832403.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=R1I6QQMFcG7j0htw3B_SpA',
      url: 'https://vnexpress.net/cu-dan-chia-phe-vi-chung-cu-cam-xe-dien-4989720.html',
      category: 'Đời sống',
      publishedAt: '1764832439'
    },
    {
      id: '4988913',
      title: 'Bức xúc vì tiếng ồn sân pickleball',
      description: 'Chỉ tay sang sân pickleball đối diện nhà ở phố Hoàng Ngân, Hà Nội, chị Ngọc Lan ví âm thanh phát ra từ đó là "bản giao hưởng hỗn loạn" kéo dài 20 tiếng mỗi ngày.',
      thumbnail: 'https://i1-giadinh.vnecdn.net/2025/12/04/pick-1-1764809766-1764809832-9636-1764809840.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=kZRRpprKaea1hmb-yz-z7w',
      url: 'https://vnexpress.net/buc-xuc-vi-tieng-on-san-pickleball-4988913.html',
      category: 'Đời sống',
      publishedAt: '1764809840'
    },
    {
      id: '4989155',
      title: 'Người Phú Quốc ngày ngủ, đêm thức vì mất điện',
      description: '22h đêm, đèn vừa bật sáng chị Nguyễn Thảo Nguyên, 33 tuổi, ở phường Dương Đông bật dậy, đeo tạp dề lao vào bếp.',
      thumbnail: 'https://i1-giadinh.vnecdn.net/2025/12/03/588370945-122153584778700372-2-2986-5533-1764780579.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=nd94XFcIRVmPWGgv654y7A',
      url: 'https://vnexpress.net/nguoi-phu-quoc-ngay-ngu-dem-thuc-vi-mat-dien-4989155.html',
      category: 'Đời sống',
      publishedAt: '1764780579'
    },
    {
      id: '4988807',
      title: 'Điều gì giúp Hà Nội đón lượng khách cao nhất lịch sử?',
      description: 'Sự kiện 80 năm Quốc khánh, chính sách visa nới lỏng kết hợp các sản phẩm mới là các lý do chính giúp Hà Nội đột phá trong việc hút khách du lịch.',
      thumbnail: 'https://i1-dulich.vnecdn.net/2025/12/02/dsc-2095-1764668642-1764668666-2070-1764668807.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=S8YY2k1JS8EF3y0nG7Ay4g',
      url: 'https://vnexpress.net/dieu-gi-giup-ha-noi-don-luong-khach-cao-nhat-lich-su-4988807.html',
      category: 'Đời sống',
      publishedAt: '1764668807'
    },
    {
      id: '4989173',
      title: 'Làn sóng trả mặt bằng nhà phố cuối năm',
      description: 'Vào mùa mua sắm cuối năm song chủ mặt bằng nhà phố liên tiếp treo biển tìm khách thuê, thậm chí chấp nhận giảm giá 10-20%.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/03/img-8207-1764732939-1764732973-6104-4472-1764736485.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=C2HpRA50Q-tJmzYm6Uecsw',
      url: 'https://vnexpress.net/lan-song-tra-mat-bang-nha-pho-cuoi-nam-4989173.html',
      category: 'Đời sống',
      publishedAt: '1764736485'
    }
  ],
  'so-hoa': [
    {
      id: '4989443',
      title: 'Tên lửa tái sử dụng của Trung Quốc bốc cháy khi thử hạ cánh',
      description: 'Tên lửa Zhuque-3 mang tải trọng mô phỏng lên quỹ đạo Trái Đất thấp, nhưng khi tầng một tách ra và quay về sa mạc Gobi để thử hạ cánh thì bất ngờ bốc cháy, rơi xuống rìa bãi đáp.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/03/20251203180314-1764759857-9973-1764759892.gif?w=220&h=132&q=100&dpr=1&fit=crop&s=76AYtxWfTjWSOFB3v_K_Fw&t=image',
      url: 'https://vnexpress.net/ten-lua-tai-su-dung-cua-trung-quoc-boc-chay-khi-thu-ha-canh-4989443.html',
      category: 'Số hóa',
      publishedAt: '1764759892'
    },
    {
      id: '4989733',
      title: 'Nguyên Bộ trưởng Khoa học và Công nghệ Chu Tuấn Nhạ qua đời',
      description: 'GS.TS Chu Tuấn Nhạ, nguyên Bộ trưởng Khoa học và Công nghệ, qua đời ngày 1/12, hưởng thọ 87 tuổi, sau thời gian dài lâm bệnh nặng.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/04/IMG5798-1764828716-8332-1764828726.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=ZLiqQl0fiSgX0eM801cLpw',
      url: 'https://vnexpress.net/nguyen-bo-truong-khoa-hoc-va-cong-nghe-chu-tuan-nha-qua-doi-4989733.html',
      category: 'Số hóa',
      publishedAt: '1764828726'
    },
    {
      id: '4989430',
      title: "'Thanh niên ngã thì đứng dậy, không sợ thất bại'",
      description: 'Bộ trưởng Khoa học và Công nghệ Nguyễn Mạnh Hùng cho rằng thanh niên với nhiều năng lượng, khát vọng, không sợ thất bại.',
      thumbnail: 'https://i1-vnexpress.vnecdn.net/2025/12/03/bt-jpeg-1764772050-1764772076-2430-1764772171.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=JE6m9Yn0Q2EG228-khdfMg',
      url: 'https://vnexpress.net/thanh-nien-nga-thi-dung-day-khong-so-that-bai-4989430.html',
      category: 'Số hóa',
      publishedAt: '1764802800'
    },
    {
      id: '4989667',
      title: "'Cấm xe máy xăng vào vành đai 1 Hà Nội từ tháng 7/2026 là quá gấp'",
      description: 'Đại diện Grab cùng nhà sản xuất xe điện Selex Motors cho rằng thời hạn cấm xe máy xăng vào vành đai 1 của Hà Nội từ tháng 7/2026 là quá gấp.',
      thumbnail: 'https://i1-kinhdoanh.vnecdn.net/2025/12/04/2-jpg-7962-1764157482-17647655-7069-7134-1764820100.png?w=680&h=408&q=100&dpr=1&fit=crop&s=2JssSbGDPrrDCYeW3bQbzw',
      url: 'https://vnexpress.net/cam-xe-may-xang-vao-vanh-dai-1-ha-noi-tu-thang-7-2026-la-qua-gap-4989667.html',
      category: 'Số hóa',
      publishedAt: '1764832896'
    },
    {
      id: '4989720',
      title: 'Cư dân chia phe vì chung cư cấm xe điện',
      description: 'Mấy ngày qua, gia đình chị Kiều Oanh ở chung cư HH Linh Đàm đau đầu tìm chỗ gửi xe điện.',
      thumbnail: 'https://i1-giadinh.vnecdn.net/2025/12/04/xe-dien-2-1764832349-176483236-4083-6929-1764832403.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=R1I6QQMFcG7j0htw3B_SpA',
      url: 'https://vnexpress.net/cu-dan-chia-phe-vi-chung-cu-cam-xe-dien-4989720.html',
      category: 'Số hóa',
      publishedAt: '1764832439'
    }
  ]
};
