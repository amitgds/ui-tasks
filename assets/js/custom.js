$(document).ready(function () {
    // Initialize AOS
    gsap.registerPlugin(ScrollTrigger);
        
    applyEffect('tab-content');
    
    // Function to handle tab-specific logic
    function handleTabChange(tabId) { 
      
      $("#taskTabs").find(".active").removeClass("active");
      
      $("#taskTabs").find("#" + tabId + "-tab").addClass("active");

      switch (tabId) {
        case "task-1":
          // Tab 1 JS
          let selectedReward = "";
          const rewardRadios = document.querySelectorAll('input[name="option"]');
          const spaImage = document.getElementById('spaImage');
          const villaImage = document.getElementById('villaImage');
          const yachtImage = document.getElementById('yachtImage');
          const polaroid = document.getElementById('polaroid');
  
          rewardRadios.forEach(radio => {
            radio.addEventListener('change', () => {
              selectedReward = radio.value;
  
              spaImage.style.display = 'none';
              villaImage.style.display = 'none';
              yachtImage.style.display = 'none';
  
              if (selectedReward === "spa") {
                spaImage.style.display = 'block';
              } else if (selectedReward === "villa") {
                villaImage.style.display = 'block';
              } else if (selectedReward === "yacht") {
                yachtImage.style.display = 'block';
              }
  
             // polaroid.style.border = "10px solid #000";
            });
          });
  
          window.addEventListener('load', () => {
            polaroid.style.border = "10px solid #fdfdfd";
          });
  
          

          break;
  
        case "task-2":
          $('.coupon-ballon').hide();

          const colors = ['rgba(140, 18, 4, 1)', 'rgba(5, 88, 166, 1)'];
    
          for (let i = 0; i < 5; i++) {
            createBalloon(i);
          }
    
          $('.cross-icon').click(function () {
            $('.little-ballon').hide();
          });
    
          $('.balloon').click(function (){
        
            let $balloon = $(this);
            let color = '#04aa6d';
            let position = $balloon.position();
            let balloonWidth = $balloon.width();
            let balloonHeight = $balloon.height();
    
            if ($balloon.hasClass('popping')) return;
              
            $balloon.addClass('popping');
    
            $balloon.css({
              'transform': 'scale(1.5)',
              'opacity': '0',
              'transition': 'all 0.3s ease-out'
            });
    
            const $container = $('.game-container');

            if ($container.length) {
              for (let i = 0; i < 12; i++){
                  createParticle(
                    position.left + balloonWidth / 2,
                    position.top + balloonHeight / 2,
                    color,
                    $container
                  );
              }
            }
    
            setTimeout(() => {
              $balloon.remove();
    
              if ($('.balloon').length === 0) {
                $('#discount-text').fadeIn(500).css('display', 'none');
                $('.coupon-ballon').fadeIn(500).css('display', 'block');
              }
            }, 300);
          });
    
          $('.copy-btn').click(function (){
    
            let textToCopy = $('#copy-text').text();
            let $temp = $('<textarea>');
              $('body').append($temp);
              $temp.val(textToCopy).select();
              document.execCommand('copy');
              $temp.remove();
              const $btn = $(this);
              $btn.text('Copied!');
          });
    
          function createBalloon(index){
    
            let size = 20 + Math.random() * 40;
            let left = Math.random() * 100;
            let duration = 25 + Math.random() * 35;
            let delay = Math.random() * 20;
            let color = colors[Math.floor(Math.random() * colors.length)];
      
            const balloonId = 'balloon-' + Date.now() + '-' + Math.floor(Math.random() * 500);
            const $balloon = $('<div class="bg-balloon"><div class="bg-balloon-thread"></div></div>')
              .attr('id', balloonId)
              .css({
                '--balloon-color': color,
                'width': size + 'px',
                'height': size * 1.25 + 'px',
                'left': left + '%',
                'animation-duration': duration + 's',
                'background': color,
              });
    
            const styleRule = `
              #${balloonId}::before {
                content:"▲";
                    left: 50%;
                    font-size:20px;
                    color:${color};
                    display:block;
                    text-align:center;
                    width:100%;
                    position:absolute;
                    bottom:-10px;
                    z-index:-100;
                    transform: translateX(-50%); 
              }`;
    
              $('<style>')
                .prop('type', 'text/css')
                .html(styleRule)
                .appendTo('head');
    
              $('#backgroundBalloons').append($balloon);
    
              setTimeout(function () {
                $balloon.remove();
                $(`style:contains('#${balloonId}::before')`).remove();
                createBalloon(index);
              }, (duration + delay) * 500);
          }
    
          function createParticle(x, y, color, container) {
            // Convert jQuery to DOM if needed
            if (container instanceof jQuery) {
              container = container[0];
            }
          
            let size = 5 + Math.random() * 8;
          
            const particle = document.createElement('div');
            particle.classList.add('particle');
            Object.assign(particle.style, {
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 1000
            });
            
            container.appendChild(particle);
          
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 50;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
          
            gsap.to(particle, {
              duration: 0.5 + Math.random(),
              x: dx,
              y: dy,
              opacity: 0,
              ease: "linear",
              onComplete: () => {
                particle.remove();
              }
            });
          }

          
          

          
        break;
  
        case "task-3":
          // Tab 3 JS
          let currentIndex = 0;
          const slides = $('.slide');
  
          slides.eq(currentIndex).addClass('active');
  
          setInterval(() => {
            slides.eq(currentIndex).removeClass('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides.eq(currentIndex).addClass('active');
          }, 3000);
  
          // $('.close-btn').click(function () {
          //   $('.popup').hide();
          // });
          break;
  
        case "task-4":
          // Tab 4 JS
          const quizData = [
            { question: "Who is this fragrance for?", options: ["For him", "For her"] },
            { question: "This fragrance will mostly be worn in the...", options: ["Daytime", "Evening"] }
          ];
  
          let currentQuestion = 0;
  
          $('#start-quiz').click(function () {
            $('#quiz-title, #quiz-description, #start-quiz').hide();
            $('#quiz-content').show();
            loadQuestion();
          });
  
          function loadQuestion() {
            if (currentQuestion < quizData.length) {
              $('#question-text').text(quizData[currentQuestion].question);
              $('#options').empty();
              quizData[currentQuestion].options.forEach((option, index) => {
                $('#options').append(`<button data-next="${index}">${option}</button>`);
              });
            } else {
              $('#quiz-content').html('<p>Thank you for completing the quiz!</p>');
            }
          }
  
          $(document).on('click', '.quiz-options button', function () {
            currentQuestion++;
            loadQuestion();
          });
  
          // $('.cross-icon').click(function () {
          //   $('.quiz-product').hide();
          // });
          break;
  
          case "task-5":
            // Tab 5 JS
            // Dynamically add the Bootstrap Icons CSS for Task 5
            if (!$('link[href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"]').length) {
                $('head').append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">');
            }


            let targetsHit = 0;

            $(".message-container").hide();

            $(".game-container").show();
            $(".startArea").show();

            let currentTargetIndex = 0;
            const gameContainer = $('.game-container');
            if (gameContainer.find('.target').length > 0) {
             gameContainer.find('.target').remove();
            }
            
            const timerDisplay = $('.timer');
    
            const targetIcons = [
              '<i class="bi bi-cup"></i>',
              '<i class="bi bi-circle"></i>',
              '<i class="bi bi-dribbble"></i>'
            ];
            
           
            let targetTimeout;
            let countdown;
    
            function startTimer() {
              let timeLeft = 5;
              timerDisplay.text(`Time: ${timeLeft}s`);
    
              countdown = setInterval(() => {
                timeLeft--;
                timerDisplay.text(`Time: ${timeLeft}s`);
    
                if (timeLeft <= 0) {
                  clearInterval(countdown);
                }
              }, 1000);
            }
    
            function generateTarget() {

              if (currentTargetIndex >= 5) return;
    
              gameContainer.find('.target').remove(); // Remove only targets, keep timer
    
              let target = $('<div class="target"></div>');
              let x = Math.random() * (gameContainer.width() + 150);
              let y = Math.random() * (gameContainer.height() + 300);
              let randomIcon = targetIcons[Math.floor(Math.random() * targetIcons.length)];
              target.css({ top: y + 'px', left: x + 'px' });
              target.html(randomIcon);
    
              gameContainer.append(target);
              startTimer();
            }
    
            $(document).on('click', '.target', function () {
              clearTimeout(targetTimeout);
              clearInterval(countdown);
              $(this).remove();
              targetsHit++;
              currentTargetIndex++;
    
              if (targetsHit >= 4) {
                gameContainer.fadeOut(400, function () {                 
                  $('.message-container').fadeIn(400, function () {
                    //applyEffect('tab-content');
                    //AOS.refresh(); // Refresh again after fadeIn completes
                  });
                });
              } else {
                setTimeout(generateTarget, 500);
              }
    
              $(".targetsHit").text(targetsHit);
            });
    
            $('.start-button').click(function () {                
              $(".startArea").hide();
              $('.message-container').hide();
              gameContainer.find('.target').remove(); // Remove only targets, not timer
    
              targetsHit = 0;
              currentTargetIndex = 0;
              generateTarget();
            });
    
            $('.cross-icon').click(function () {
              $('.timer-gift').hide();
            });
    
            $('.cross-icon').click(function () {
              $('.save-sharp').hide();
            });
            break;

  
          case "task-6":
            // Tab 6 JS
            $(".gift-cards").show();
            $(".gc-card").hover(
              function () {
                if (!$(this).hasClass("has-value")) {
                  $(".card-message").addClass("hide");
    
                  setTimeout(() => {
                    $(".card-message").removeClass("hide");
                  }, 500); // Adjust delay time as needed
                }
              },
              function () {
                setTimeout(() => {
                  $(".card-message").addClass("hide");
                }, 500); // Adjust delay time as needed
              }
            );
            
          
            break;
  
        case "task-7":
          // Tab 7 JS
          console.log("Task 7 logic goes here.");
          break;
      }

      

    }
  
    
    $(".showNextTab").click(function () {
      const currentTab = $(this).closest(".tab-pane");
      const nextTab = currentTab.next(".tab-pane");
      if (nextTab.length) {
        currentTab.removeClass("show active");
        nextTab.addClass("show active");
        applyEffect('tab-content');
        handleTabChange(nextTab.attr("id"));
      }
    });

    function applyEffect(className=false){
      gsap.from('.'+className, {
        scrollTrigger: '.'+className,
        y: -70, // 👈 Slide in from the top
        opacity: 0,
        duration: 1
      });
    }

     // Listen for tab shown event
  const tabButtons = document.querySelectorAll('button[data-bs-toggle="tab"]');
  tabButtons.forEach(button => {
    button.addEventListener('shown.bs.tab', function () {
      applyEffect('tab-content');
      handleTabChange(button.getAttribute('aria-controls')); // Get the ID of the active tab
    
    });
  });
  
    // Initialize the first tab
    handleTabChange("task-1");
  });