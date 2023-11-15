$(document).ready(function(){
    rating_value = 0;
    $('#add_review').click(function(){

        $('#myModal').modal('show')
    })


    $(document).on('mouseenter','.submit_star',function(){
         rating = $(this).data('rating')
         resetStar()
         for(var i =1;i<=rating;i++){
             $('#submit_star_'+i).addClass('text-warning')
         }
    })



    function resetStar(){
        for(var i =0;i<=5;i++){
            $('#submit_star_'+i).addClass('star-light')
            $('#submit_star_'+i).removeClass('text-warning')
        }
       }


       
   
  

$(document).on('click','.submit_star',function(){
     rating_value = $(this).data('rating') 
     for(var i =1;i<=rating_value;i++){
        $('#submit_star_'+i).addClass('text-warning')
    }
})


$('#sendReview').click(function(){
    userName  = $('#userName').val()
    userMessage  = $('#userMessage').val()
    if(userName == '' || userMessage == ''){
        alert('Please, Fill both Fields')
        return false;
    }else{
        $.ajax({
            url:'ratingsubmit.php',
            method:'POST',
            data:{rating_value:rating_value, userName:userName, userMessage:userMessage},
            success:function(data){
                $('#myModal').modal('hide')
                console.log(data)
                loadData()
            }
        })
    }


})



load_rating_data();

    function load_rating_data()
    {
        $.ajax({
            url:"ratingsubmit.php",
            method:"POST",
            data:{action:'load_data'},
            dataType:"JSON",
            success:function(data)
            {
                $('#average_rating').text(data.average_rating);
                $('#total_review').text(data.total_review);

                var count_star = 0;

                $('.main_star').each(function(){
                    count_star++;
                    if(Math.ceil(data.average_rating) >= count_star)
                    {
                        $(this).addClass('text-warning');
                        $(this).addClass('star-light');
                    }
                });

                $('#total_five_star_review').text(data.five_star_review);

                $('#total_four_star_review').text(data.four_star_review);

                $('#total_three_star_review').text(data.three_star_review);

                $('#total_two_star_review').text(data.two_star_review);

                $('#total_one_star_review').text(data.one_star_review);

                $('#five_star_progress').css('width', (data.five_star_review/data.total_review) * 100 + '%');

                $('#four_star_progress').css('width', (data.four_star_review/data.total_review) * 100 + '%');

                $('#three_star_progress').css('width', (data.three_star_review/data.total_review) * 100 + '%');

                $('#two_star_progress').css('width', (data.two_star_review/data.total_review) * 100 + '%');

                $('#one_star_progress').css('width', (data.one_star_review/data.total_review) * 100 + '%');

                if(data.review_data.length > 0)
                {
                    var html = '';

                    for(var count = 0; count < data.review_data.length; count++)
                    {
                        html += '<div class="row mb-3">';

                        html += '<div class="col-sm-1"><div class="rounded-circle bg-danger text-white pt-2 pb-2"><h3 class="text-center">'+data.review_data[count].user_name.charAt(0)+'</h3></div></div>';

                        html += '<div class="col-sm-11">';

                        html += '<div class="card">';

                        html += '<div class="card-header"><b>'+data.review_data[count].user_name+'</b></div>';

                        html += '<div class="card-body">';

                        for(var star = 1; star <= 5; star++)
                        {
                            var class_name = '';

                            if(data.review_data[count].rating >= star)
                            {
                                class_name = 'text-warning';
                            }
                            else
                            {
                                class_name = 'star-light';
                            }

                            html += '<i class="fas fa-star '+class_name+' mr-1"></i>';
                        }

                        html += '<br />';

                        html += data.review_data[count].user_review;

                        html += '</div>';

                        html += '<div class="card-footer text-right">On '+data.review_data[count].datetime+'</div>';

                        html += '</div>';

                        html += '</div>';

                        html += '</div>';
                    }

                    $('#display_review').html(html);
                }
            }
        })
    }



})