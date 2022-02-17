const moment = require("moment");
const {
	LESSONS,
	MAPS,
	TICKRATES,
	FAKE_LOADING,
	TYPES,
	KNIFES,
	getApiSteam,
} = require("../constants/api");
const axios = require("axios");
const formidable = require("formidable");
const fs = require("fs");

module.exports = {
	index: (req, res) => {
		res.render("admin/index");
	},
	tables: async (req, res) => {
		const lessons = await axios.get(LESSONS);
		const maps = await axios.get(MAPS);
		const tickrates = await axios.get(TICKRATES);
		const types = await axios.get(TYPES);
		const knifes = await axios.get(KNIFES);

		res.render("admin/tables", {
			lessons: lessons.data,
			moment,
			maps: maps.data,
			tickrates: tickrates.data,
			types: types.data,
			knifes: knifes.data,
		});
	},
	addLesson: async (req, res) => {
		const maps = await axios.get(MAPS);
		const tickrates = await axios.get(TICKRATES);

		res.render("admin/add-lesson", {
			maps: maps.data,
			tickrates: tickrates.data,
		});
	},
	addLessonPost: (req, res) => {
		var form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const map = fields.map;
			const nameOfMap = await axios.get(MAPS + "/info/" + map);
			const urlVideo = nameOfMap.data[0].map_name.toLowerCase() + "/" + fields.urlVideo;
			const tickrate = fields.tickrate;
			const urlImage = fields.urlImage;
			const position = fields.position;
			const video_duration = fields.video_duration;
			const isShow = fields.isShow ? true : false;

			/* Handle Upload File */
			const originNameVideo = files.videoFile.originalFilename;
			const originNamePoster = files.posterFile.originalFilename;
			// Handle choose folder for video

			const destinationVideo =
				process.env.SOURCE +
				"public\\assets\\video\\" +
				nameOfMap.data[0].map_name.toLowerCase() +
				"\\" +
				originNameVideo;
			const destinationPoster =
				process.env.SOURCE + "public\\assets\\poster\\" + originNamePoster;

			const pathFileVideo = files.videoFile.filepath;
			const pathFilePoster = files.posterFile.filepath;

			if (originNameVideo) {
				fs.copyFile(pathFileVideo, destinationVideo, (err) => {
					if (err) throw err;
					fs.unlink(pathFileVideo, () => {
						console.log("Đã xóa file tạm");
					});
					console.log("Đã upload xong file " + originNameVideo);
				});
			}

			if (originNamePoster) {
				fs.copyFile(pathFilePoster, destinationPoster, (err) => {
					if (err) throw err;
					fs.unlink(pathFilePoster, () => {
						console.log("Đã xóa file tạm");
					});
					console.log("Đã upload xong file " + originNamePoster);
				});
			}
			/* End Handle Upload File */

			/* Handle Rest Post to API */
			axios
				.post(LESSONS, {
					video_url: urlVideo,
					mapId: map,
					tickrateId: tickrate,
					poster: urlImage,
					position,
					video_duration,
					isShow,
				})
				.then((resp) => {
					if (resp.data) {
						res.redirect("/admin/tables");
					}
				});
		});
	},
	updateLesson: async (req, res) => {
		const maps = await axios.get(MAPS);
		const tickrates = await axios.get(TICKRATES);
		const _id = req.params._id;
		const lesson = await axios.get(LESSONS + "/" + _id);
		res.render("admin/update-lesson", {
			maps: maps.data,
			tickrates: tickrates.data,
			lesson: lesson.data[0],
		});
	},
	updateLessonPost: (req, res) => {
		var form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const map = fields.map;
			const nameOfMap = await axios.get(MAPS + "/info/" + map);
			const urlVideo = nameOfMap.data[0].map_name.toLowerCase() + "/" + fields.urlVideo;
			const tickrate = fields.tickrate;
			const urlImage = fields.urlImage;
			const position = fields.position;
			const video_duration = fields.video_duration;
			const isShow = fields.isShow ? true : false;

			/* Handle Upload File */
			const originNameVideo = files.videoFile.originalFilename;
			const originNamePoster = files.posterFile.originalFilename;
			// Handle choose folder for video

			const destinationVideo =
				process.env.SOURCE +
				"public\\assets\\video\\" +
				nameOfMap.data[0].map_name.toLowerCase() +
				"\\" +
				originNameVideo;
			const destinationPoster =
				process.env.SOURCE + "public\\assets\\poster\\" + originNamePoster;

			const pathFileVideo = files.videoFile.filepath;
			const pathFilePoster = files.posterFile.filepath;

			if (originNameVideo) {
				fs.copyFile(pathFileVideo, destinationVideo, (err) => {
					if (err) throw err;
					fs.unlink(pathFileVideo, () => {
						console.log("Đã xóa file tạm");
					});
					console.log("Đã upload xong file " + originNameVideo);
				});
			}

			if (originNamePoster) {
				fs.copyFile(pathFilePoster, destinationPoster, (err) => {
					if (err) throw err;
					fs.unlink(pathFilePoster, () => {
						console.log("Đã xóa file tạm");
					});
					console.log("Đã upload xong file " + originNamePoster);
				});
			}
			/* End Handle Upload File */
			const _id = req.params._id;

			/* Handle Rest Post to API */
			axios
				.patch(LESSONS + `/${_id}`, {
					video_url: urlVideo,
					mapId: map,
					tickrateId: tickrate,
					poster: urlImage,
					position,
					video_duration,
					isShow,
				})
				.then((resp) => {
					if (resp.data) {
						if (resp.data.modifiedCount >= 1) {
							FAKE_LOADING
								? setTimeout(() => {
										res.redirect("/admin/tables");
								  }, 1500)
								: res.redirect("/admin/tables");
						}
					}
				});
		});
	},
	addProduct: async (req, res) => {
		const types = await axios.get(TYPES);
		const maps = await axios.get(MAPS);
		const tickrates = await axios.get(TICKRATES);
		res.render("admin/add-product", {
			moment,
			maps: maps.data,
			tickrates: tickrates.data,
			types: types.data,
		});
	},
	addProductPost: async (req, res) => {
		var form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const market_hash_name = fields.productName;
			const typeId = fields.typeId;
			const isShow = fields.isShow;
			const description = fields.description;
			try {
				const getAPISteam = await getApiSteam(market_hash_name);
				const lowest_price = getAPISteam.data.lowest_price;
				const volume = +getAPISteam.data.volume || 0;
				const img_url = "https://api.steamapis.com/image/item/730/" + market_hash_name;

				const result = await axios.post(KNIFES, {
					market_hash_name,
					typeId,
					isShow,
					lowest_price,
					volume,
					img_url,
					description,
				});

				if (result) {
					res.redirect("/admin/tables");
				}
			} catch (error) {
				console.log(error)
				res.status(404).send("Lỗi khi gọi Steam API");
			}
		});
	},
};
