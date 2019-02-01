var app = angular.module('miniQuiz', []);

// *************


// *********
app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "Which of the followings are validation directives?",
			options: ["ng-required", "ng-minlength", "ng-pattern", "All of the above"],
			answer: 3
		},
		{
			question: "Which components can be injected as a dependency in AngularJS?",
			options: [" Brad Green", "Igor Minor", " Misko Hevery", "Brian Ford"],
			answer: 2
		},
		{
			question: "AngularJS module can be created using ________",
			options: ["angular.module();", "var myModule = new module();", "module.create();", "angular.create();"],
			answer: 0
		},
		{
			question: "What angular function is used to manually start up an angular application?",
			options: ["angular.bootstrap", "angular.bootstrap", "angular.copy", "None of the above"],
			answer: 2
		},
		{	
			question: "AngularJS directives are used in ________",
			options: ["Model", "View", "Controller", "Module"],
			answer: 1
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});

// Controller
$scope.isLast = function(check) {
    var cssClass = check ? 'last' : null;
    return cssClass;
};