import { users } from '@pages/HomePage/fixtures';

export const newDevice = {
  data: {
    success: true,
    message: 'Device has been added and configured successfully',
    data: {
      device: {
        verified: false,
        _id: '5dfa0dcd53890575b993eb74',
        id: 'abcdefg',
        user: {
          photo: 'https://lh3.googleusercontent.com/a-/AAuE7mDwn6ds_ExMJ4T52OnGU54KX1c1zjQk3xhoBOR2VG0',
          _id: '5db36e9e169d644d72e9f27e',
          name: 'Almond Froyo',
        },
      },
    },
  },
};

export const requestPayload = {
  id: 'abcdefg',
};
