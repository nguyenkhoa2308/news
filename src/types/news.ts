export interface Article {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: string;
  publishedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Thời sự', slug: 'thoi-su' },
  { id: '2', name: 'Góc nhìn', slug: 'goc-nhin' },
  { id: '3', name: 'Thế giới', slug: 'the-gioi' },
  { id: '4', name: 'Kinh doanh', slug: 'kinh-doanh' },
  { id: '5', name: 'Bất động sản', slug: 'bat-dong-san' },
  { id: '6', name: 'Khoa học', slug: 'khoa-hoc' },
  { id: '7', name: 'Giải trí', slug: 'giai-tri' },
  { id: '8', name: 'Thể thao', slug: 'the-thao' },
  { id: '9', name: 'Pháp luật', slug: 'phap-luat' },
  { id: '10', name: 'Giáo dục', slug: 'giao-duc' },
  { id: '11', name: 'Sức khỏe', slug: 'suc-khoe' },
  { id: '12', name: 'Đời sống', slug: 'doi-song' },
  { id: '13', name: 'Du lịch', slug: 'du-lich' },
  { id: '14', name: 'Số hóa', slug: 'so-hoa' },
  { id: '15', name: 'Xe', slug: 'oto-xe-may' },
  { id: '16', name: 'Ý kiến', slug: 'y-kien' },
  { id: '17', name: 'Tâm sự', slug: 'tam-su' },
];
