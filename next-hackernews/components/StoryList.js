const StoryList = ({ stories }) => (
    <div>
        {stories.map(story => (
            <h2 key={story.id}>{story.title}</h2>
        ))}
    </div>
);

export default StoryList;