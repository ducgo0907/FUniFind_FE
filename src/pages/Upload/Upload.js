import { useState } from "react";
import postService from "../../services/post.service";

function UploadImage({ user }) {
	const [imagesState, setImagesState] = useState([]);
	const [previewImages, setPriviewImages] = useState([]);
	const [message, setMessage] = useState("");

	const selectFilesHandler = async (e) => {
		const imagesData = [];
		const previewImagesArray = [];
		const files = e.target.files;

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const imageData = await readFileHandler(file);
			if(imageData != undefined){
				imagesData.push(imageData);
			}

			if (file.type.startsWith('image/')) {
				previewImagesArray.push(URL.createObjectURL(file));
			}
		}

		// Ensure that you set the previewImages state to a new array with the current previews
		setPriviewImages([...previewImagesArray]);

		// Update the images state to accumulate all selected images
		setImagesState((prevImages) => [...prevImages, ...imagesData]);
	};

	const readFileHandler = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImagesState((curr) => [...curr, reader.result]);
			return reader.result;
		};
	};

	const uploadFilesHandler = async (postId) => {
		setMessage("Uploading...");
		const formData = new FormData();
		for (let i = 0; i < imagesState.length; i++) {
			let file = imagesState[i];
			formData.append("file", file);
		}
		formData.append("postId", postId);
		try {
			const res = await fetch("http://localhost:8080/images/upload", {
				method: "POST",
				body: formData,
			});

			const data = await res.json();
			// const data = false;
			if (data) {
				setMessage("Done!");
				setImagesState([]);
				setPriviewImages([]);
			}
			console.log(data);
			console.log(formData, imagesState);
		} catch (e) {
			console.log(e);
			setMessage("Error! Could not upload");
		}
	};

	const handlePostSubmit = async (e) => {
		e.preventDefault();
		const newPost = e.target.post.value; // Get the new post text from the form
		if (newPost) {
			postService.createPost(newPost)
				.then(async (response) => {
					if (imagesState && imagesState.length > 0) {
						await uploadFilesHandler(response.data._id);
					}
					alert("Post created successfully! Waiting for admin approve.");
					e.target.reset(); // Clear the form
					// Upload image
				})
				.catch(error => {
					console.log(error);
				})
		}
	};
	return (
		<>
			{user && <form onSubmit={handlePostSubmit}>
				<div className="form-group">
					<textarea
						name="post"
						className="form-control"
						placeholder="What's on your mind?"
						rows="3"
						required
					></textarea>
					<input
						type="file"
						onChange={selectFilesHandler}
						accept="image/*"
						multiple="multiple"
					/>
					<div>
						{previewImages.map((preview, index) => (
							<img
								key={index}
								src={preview}
								alt={`Preview ${index}`}
								style={{ width: '100px', height: '100px', margin: '5px' }}
							/>
						))}
					</div>
				</div>
				<button type="submit" className="btn btn-primary">
					Post
				</button>
			</form>}
		</>
	);
}

export default UploadImage;