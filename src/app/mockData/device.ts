import { Device } from '../interface/device';

export const DEVICES: Device[] = [
  {
    id: 1,
    room_id: 1,
    name: 'Ceiling Light',
    icon: 'bulb',
    status: true,
    charUuid: 'abcd-1234',
  },
  {
    id: 2,
    room_id: 1,
    name: 'Smart TV',
    icon: 'tv',
    status: false,
    charUuid: 'efgh-5678',
  },
  {
    id: 3,
    room_id: 1,
    name: 'Air Conditioner',
    icon: 'snow',
    status: true,
  },
  {
    id: 4,
    room_id: 2,
    name: 'Bed Lamp',
    icon: 'flashlight',
    status: false,
  },
  {
    id: 5,
    room_id: 2,
    name: 'Air Purifier',
    icon: 'leaf',
    status: true,
  },
  {
    id: 6,
    room_id: 3,
    name: 'Refrigerator',
    icon: 'cube',
    status: true,
  },
  {
    id: 7,
    room_id: 3,
    name: 'Microwave Oven',
    icon: 'radio',
    status: false,
  },
  {
    id: 8,
    room_id: 4,
    name: 'Water Heater',
    icon: 'water',
    status: false,
  },
];
