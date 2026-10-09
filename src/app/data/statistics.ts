export interface FallbackStatItem {
  id: number;
  value: string;
  label: string;
  icon: string;
}

export const statistics: FallbackStatItem[] = [
  {
    id: 1,
    value: '450+',
    label: 'statistics.students',
    icon: 'users',
  },
  {
    id: 2,
    value: '45+',
    label: 'statistics.teachers',
    icon: 'graduation-cap',
  },
  {
    id: 3,
    value: '25+',
    label: 'statistics.clubs',
    icon: 'trophy',
  },
  {
    id: 4,
    value: '15',
    label: 'statistics.rooms',
    icon: 'school',
  },
];
