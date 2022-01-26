const commentHandler = async (event) => {
    event.preventDefault();

    const commentdesc = document.querySelector('#comment-add').value.trim();
    const post_id = document.querySelector("#post-id").value;
  
    if (commentdesc && post_id) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ commentdesc, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('created comment on post', post_id , commentdesc );
        document.location.reload();
      } else {
        console.log('Failed to create comment');
      }
    } else {
      console.log('No description detected')
    }
  };
  
document
.querySelector('.new-comment')
.addEventListener('submit', commentHandler);