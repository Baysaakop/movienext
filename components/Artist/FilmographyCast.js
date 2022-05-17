import { Timeline } from "antd"

const FilmographyCast = ({ artist }) => {

    return (
        <div style={{ marginTop: '24px' }}>
            <Timeline mode="left">
                <Timeline.Item label="2010">Хайрын рекорд</Timeline.Item>
                <Timeline.Item label="2013">Single Ladies</Timeline.Item>
                <Timeline.Item label="2014">Тусгай ажиллагаа</Timeline.Item>
                <Timeline.Item label="2015">Single Ladies 2</Timeline.Item>
                <Timeline.Item label="2017">Single Ladies 3</Timeline.Item>
                <Timeline.Item label="2019">Тэнгэрээс буусад од</Timeline.Item>
                <Timeline.Item label="2020">Single Ladies 4: Төгсгөл ба эхлэл</Timeline.Item>
            </Timeline>
        </div>
    )
}

export default FilmographyCast