
// Pesquisar itens no menu Lateral
$(function(){
	$("#filtro-lista").keyup(function(){
		var texto = $(this).val().toLowerCase();
		$("#lista li").css("display", "block");
		$("#lista li").each(function(){
			if($(this).text().toLowerCase().indexOf(texto) < 0){
			   $("#lista li h4").css("display", "none");
			   $(".mark").css("display", "none");
			   $(this).css("display", "none");
			}else{
				$("#lista li h4").css("display", "block");
				$(".mark").css("display", "block");
			}
		});
	});
});