<template>
  <div class="project-detail">
    <div v-show="!isTitleOverflowed" class="project-title-container normal-title">
      <h2 class="project-title" :title="project.title">{{ project.title }}</h2>
    </div>
    <div v-show="isTitleOverflowed" class="overflowed-title">
      <p v-for="line in truncatedTitleLines" :key="line">{{ line }}</p>
    </div>
    <div v-show="!isDescriptionOverflowed" class="project-description-container normal-description">
      <p class="project-description" :title="project.description">{{ project.description }}</p>
    </div>
    <div v-show="isDescriptionOverflowed" class="overflowed-description">
      <p v-for="line in truncatedDescriptionLines" :key="line">{{ line }}</p>
    </div>
    <button v-if="!isMember" class="apply-button" @click="applyForProject">申请加入项目</button>

    <!-- 显示申请表单 -->
    <div v-if="showForm" class="application-form">
      <h3 class="form-title">申请理由</h3>
      <textarea v-model="applicationMessage" placeholder="填写申请理由" class="application-textarea"></textarea>
      <button class="submit-button" @click="submitApplication">提交申请</button>
    </div>

    <!-- 项目成员列表 -->
    <div v-if="isMember" class="members-list">
      <h3 class="members-title">项目成员</h3>
      <ul>
        <li v-for="member in project.members" :key="member._id" class="member-item">{{ member.username }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {},
      isMember: false,
      showForm: false,
      applicationMessage: '',
      isTitleOverflowed: false,
      isDescriptionOverflowed: false,
      titleTruncationLength: 50, // 增加标题截断长度
      descriptionTruncationLength: 200, // 增加描述截断长度
    };
  },
  async mounted() {
    const projectId = this.$route.params.id;
    const response = await fetch(`http://localhost:3000/api/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    this.project = await response.json();

    // 检查当前用户是否已经是项目成员
    const userId = localStorage.getItem('userId');
    this.isMember = this.project.members.some(member => member._id === userId);

    this.checkOverflow();
  },
  methods: {
    applyForProject() {
      this.showForm = true;
    },
    async submitApplication() {
      // Check if the application message is empty
      if (!this.applicationMessage.trim()) {
        alert('请填写申请理由。');
        return;
      }

      const token = localStorage.getItem('token');
      const projectId = this.$route.params.id;
      const response = await fetch(`http://localhost:3000/api/projects/${projectId}/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: this.applicationMessage }),
      });
      const result = await response.json();
      if (result.success) {
        alert('申请提交成功，请等待管理员审批(请不要重复提交申请！)');
        this.showForm = false;
        this.applicationMessage = ''; // Clear the textarea after submission
      } else {
        alert(result.message);
      }
    },
    truncatedTitle(title) {
      if (title && title.length > this.titleTruncationLength) {
        return title.substring(0, this.titleTruncationLength) + '...';
      } else {
        return title;
      }
    },
    truncatedDescription(description) {
      if (description && description.length > this.descriptionTruncationLength) {
        return description.substring(0, this.descriptionTruncationLength) + '...';
      } else {
        return description;
      }
    },
    splitText(text, maxLength) {
      const lines = [];
      while (text.length > maxLength) {
        let lastSpaceIndex = text.lastIndexOf(' ', maxLength);
        if (lastSpaceIndex === -1) {
          lastSpaceIndex = maxLength;
        }
        lines.push(text.substring(0, lastSpaceIndex));
        text = text.substring(lastSpaceIndex + 1);
      }
      lines.push(text);
      return lines;
    },
    checkOverflow() {
      const titleElement = this.$el.querySelector('.project-title');
      const descriptionElement = this.$el.querySelector('.project-description');
      const titleMaxHeight = parseInt(window.getComputedStyle(titleElement).height);
      const descriptionMaxHeight = parseInt(window.getComputedStyle(descriptionElement).height);
      const titleOverflowed = titleElement.scrollHeight > titleMaxHeight;
      const descriptionOverflowed = descriptionElement.scrollHeight > descriptionMaxHeight;
      this.isTitleOverflowed = titleOverflowed;
      this.isDescriptionOverflowed = descriptionOverflowed;
      if (titleOverflowed) {
        this.truncatedTitleLines = this.splitText(this.project.title, this.titleTruncationLength);
      }
      if (descriptionOverflowed) {
        this.truncatedDescriptionLines = this.splitText(this.project.description, this.descriptionTruncationLength);
      }
    },
  },
};
</script>

<style scoped>
body {
  background: linear-gradient(45deg, #ff6b6b, #f7e86a, #6bf178, #6a82fb, #c77de0);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  margin: 0;
  font-family: 'Arial', sans-serif;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.project-detail {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.project-title-container {
  background-color: rgba(255, 255, 0, 0.7); /* Yellow background */
  width: 100%; /* Full width */
  padding: 10px 0; /* Padding for spacing */
}

.project-title {
  font-size: 28px;
  color: #2c3e50;
  margin: 0; /* Remove margin to avoid extra spacing */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.normal-title {
  display: block;
}

.overflowed-title {
  display: none;
}

.project-description-container {
  background-color: rgba(0, 255, 255, 0.7); /* Cyan background */
  width: 100%; /* Full width */
  padding: 10px 0; /* Padding for spacing */
}

.project-description {
  font-size: 18px;
  color: #34495e;
  margin: 0; /* Remove margin to avoid extra spacing */
  line-height: 1.6;
}

.normal-description {
  display: block;
}

.overflowed-description {
  display: none;
}

.apply-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
}

.apply-button:hover {
  background-color: #218838;
}

.application-form {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 22px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.application-textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  margin-bottom: 10px;
}

.submit-button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #0056b3;
}

.members-list {
  margin-top: 20px;
}

.members-title {
  font-size: 22px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.member-item {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  color: #34495e;
  text-align: left;
}
</style>