
// Pesquisar itens no menu Lateral
$(function(){
	$("#filtro-lista").keyup(function(){
		var texto = $(this).val().toLowerCase();
		$("#lista li").css("display", "block");
		$("#lista li").each(function(){
			if($(this).text().toLowerCase().indexOf(texto) < 0){
			   $(this).css("display", "none");
			}
		});
	});
});