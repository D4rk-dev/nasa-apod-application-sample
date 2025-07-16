type RoverPhoto = {
    id: number;
    img_src: string;
    earth_date: string;
    camera: {
        name: string;
        full_name: string;
    };
}

type APOD = {
    date: string;
    title: string;
    url: string;
    explanation: string;
    media_type: 'image' | 'video';
}

type FavoriteItem = {
  id: string
  type: 'apod' | 'rover'
  payload: APOD | RoverPhoto
}


