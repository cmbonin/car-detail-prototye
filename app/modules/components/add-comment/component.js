import Em from 'ember';

var AddCommentComponent = Em.Component.extend({
	classNames: ['add-comment'],
	newComment: '',


	refreshComment: function() {
		this.set('newComment', '');
	},

	actions: {
		// sends comment to controller
		submitter: function() {
			this.sendAction('submit', this.get('newComment'));
			this.refreshComment();
		}
	}
});
export default AddCommentComponent;