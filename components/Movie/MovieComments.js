import { Avatar, Divider, List, Rate, Space, Typography } from 'antd'
import styles from '../../styles/Movie.module.css'

const data = [
    {
      name: 'Benedict Cumberbatch',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/fBEucxECxGLKVHBznO0qHtCGiMO.jpg',
      comment: 'Phasellus ornare laoreet velit ut posuere. Sed vestibulum scelerisque leo et fermentum. Nunc molestie scelerisque nisi eu efficitur. Nulla nisi turpis, egestas a ex ut, vestibulum venenatis felis. Curabitur eu fermentum justo, id rutrum felis.',
      score: 3,
    },
    {
      name: 'Elizabeth Olsen',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/mbMsmQE5CyMVTIGMGCw2XpcPCOc.jpg',
      comment: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer dignissim turpis in dolor placerat, et tempor arcu volutpat. Sed consectetur, dolor vitae ullamcorper scelerisque, ligula metus efficitur risus, quis aliquet felis purus in nulla.',
      score: 1.5,
    },
    {
      name: 'Benedict Wong',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/ukmfsl59Isvn9odgzMWBidA3cmt.jpg',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      score: 4.5,
    },
    {
      name: 'Xochitl Gomez',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/oo1wzI9zaRWvZOsae43raoPykgb.jpg',
      comment: 'In et posuere massa. Fusce laoreet sodales dolor eu ullamcorper. Integer gravida dignissim porttitor. Etiam vitae pellentesque sem, id pharetra velit.',
      score: 2.5,
    },
    {
      name: 'Chiwetel Ejiofor',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/kq5DDnqqofoRI0t6ddtRlsJnNPT.jpg',
      comment: 'Ut fermentum odio in purus gravida, et mollis tortor egestas. Aenean condimentum scelerisque porta.',
      score: 4,
    },
  ];

const MovieComments = () => {
    return (
      <List
            itemLayout='horizontal'
            size='small'
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={item.img} size={50} />}
                        title={
                            <Space size={16}>
                                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</div>
                                <div>
                                    <Rate allowHalf disabled defaultValue={item.score} style={{ fontSize: '16px' }} />                                        
                                </div>
                            </Space>
                        }
                        description={<span style={{ color: 'rgba(0, 0, 0, 0.75)' }}>{item.comment}</span>}
                    />                        
                </List.Item>
            )}
      />
    )
}

export default MovieComments