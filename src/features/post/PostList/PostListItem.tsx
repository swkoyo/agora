import { Avatar, Box, Button, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import { BiComment, BiDownvote, BiUpvote } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { GetPostsResponseItem } from '../../../api/post';
import useBackground from '../../../hooks/useBackground';
import useButtonColorScheme from '../../../hooks/useButtonColorScheme';
import useTextColor from '../../../hooks/useTextColor';
import { getTimePassed } from '../../../utils/dayjs';
import PostCommentForm from '../PostCommentForm';

export default function PostListItem({
    post,
    showTopic,
    showFull,
    showCommentForm
}: {
    post: GetPostsResponseItem;
    showTopic?: boolean;
    showFull?: boolean;
    showCommentForm?: boolean;
}) {
    const background = useBackground();
    const colorScheme = useButtonColorScheme();
    const navigate = useNavigate();
    const textColor = useTextColor();

    const handleTopicClick = () => {
        navigate(`/a/${post.topic.display_title}`);
    };

    const getPostBody = () => {
        if (post.media_url) {
            return <Image src={post.media_url} alt={post.title} loading='lazy' w='full' objectFit='contain' />;
        }
        if (post.body) {
            return <Text fontSize='sm'>{post.body}</Text>;
        }
        return null;
    };

    return (
        <Box display='flex' gap={2} w='full' py={3} px={2} boxShadow='md' borderRadius='md' bg={background}>
            <VStack gap={0.5} w='5%'>
                <IconButton size='lg' aria-label='upvote' variant='link' icon={<BiUpvote />} />
                <Text fontSize='md' fontWeight='bold'>
                    {post._sum.votes}
                </Text>
                <IconButton size='lg' aria-label='downvote' variant='link' icon={<BiDownvote />} />
            </VStack>
            <VStack w='full' rowGap={2} alignItems='start'>
                <HStack w='full'>
                    {showTopic && (
                        <>
                            <HStack>
                                <Avatar
                                    sx={{
                                        _hover: {
                                            cursor: 'pointer'
                                        }
                                    }}
                                    onClick={() => handleTopicClick()}
                                    size='xs'
                                    name={post.topic.display_title}
                                    src={post.topic.image_url}
                                />
                                <Button variant='link' onClick={() => handleTopicClick()}>
                                    <Text fontSize='sm' fontWeight='bold'>
                                        a/{post.topic.display_title}
                                    </Text>
                                </Button>
                            </HStack>
                            <Text fontSize='xs'>&#8729;</Text>
                        </>
                    )}
                    <Text color={textColor} fontSize='xs'>
                        Posted by u/{post.user.username} {getTimePassed(post.created_at)}
                    </Text>
                    <Box flexGrow={1} />
                    <Button colorScheme={colorScheme} size='xs' borderRadius='full'>
                        Join
                    </Button>
                </HStack>
                <Text fontWeight='semibold'>{post.title}</Text>
                {getPostBody()}
                <HStack>
                    <Button
                        colorScheme='gray'
                        color={textColor}
                        variant='ghost'
                        p={1}
                        size='xs'
                        leftIcon={<BiComment />}
                    >
                        {post._count.comments} Comments
                    </Button>
                </HStack>
                {showCommentForm && <PostCommentForm postId={post.id} />}
            </VStack>
        </Box>
    );
}
