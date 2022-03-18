window.app_kopeg_pinjaman_fSimulasi = function(owner)
{
	if (owner)
	{
		window.app_kopeg_pinjaman_fSimulasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_pinjaman_fSimulasi";
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Simulasi Pinjaman", 0);	
		uses("portalui_panel;portalui_saiGrid;portalui_sgNavigator;portalui_button;portalui_saiLabelEdit;portalui_checkBox");
		this.eNilai = new portalui_saiLabelEdit(this,{bound:[10,20,200,20],tipeText:ttNilai, caption:"Plafon"});
		this.eAngsur = new portalui_saiLabelEdit(this,{bound:[270,20,200,20],tipeText:ttNilai, caption:"Angsuran",readOnly:true});
		this.eBunga = new portalui_saiLabelEdit(this,{bound:[10,43,150,20],tipeText:ttNilai, caption:"Bunga(%)"});
		this.eJenis = new portalui_saiCB(this,{bound:[270,43,200,20],caption:"Jenis Angsuran",items:["Flat","Anuitas"]});
		this.eLama = new portalui_saiLabelEdit(this,{bound:[10,66,150,20],caption:"Lama Bayar"});
		this.bStart = new portalui_button(this,{bound:[270,66,80,18],caption:"Simulasi",click:[this,"doClick"]});
		this.sg = new portalui_saiGrid(this,{bound:[10,89,460,250],colCount:4,colTitle:["Saldo Awal","Pokok","Margin","Saldo Akhir"],colWidth:[[3,2,1,0],[100,100,100,100]],
			   colFormat:[[3,2,1,0],[cfNilai,cfNilai,cfNilai,cfNilai]]});
		this.sgn = new portalui_sgNavigator(this,{bound:[10,350,460, 25],buttonStyle:5,grid:this.sg,beforePrint:[this,"doBeforePrint"]});		
		this.setTabChildIndex();
		this.refBtn = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 35,2,22,22],image:"icon/"+system.getThemes()+"/reload.png",hint:"Refresh",click:[this,"sgnRefresh"]});
		this.ePokok = new portalui_saiLabelEdit(this,{bound:[20,3,200,20], caption:"Total Pokok"}); 
		this.eJasa = new portalui_saiLabelEdit(this,{bound:[20,4,200,20], caption:"Total Jasa"}); 
		this.rearrangeChild(10,23);
	}
};
window.app_kopeg_pinjaman_fSimulasi.extend(window.portalui_childForm);
window.app_kopeg_pinjaman_fSimulasi.implement({
	doClick: function(sender){
		var lm = nilaiToFloat(this.eLama.getText());
		var so = nilaiToFloat(this.eNilai.getText());
		var bunga = nilaiToFloat(this.eBunga.getText());				
		var pokok = Math.round(so / lm);
		var margin = Math.round(so * bunga / 100 / 12);
		var tot = so + (margin * lm);
		var angs = Math.round(tot / lm);
		var pay = so, tot1 = 0, tot2 = 0;
		this.eAngsur.setText(floatToNilai(angs));
		this.sg.clear();		
		
		for (var i = 0;i < lm;i++){
			if (this.eJenis.getText() == "Flat"){								
				this.sg.appendData([floatToNilai(so),floatToNilai(pokok),floatToNilai(margin),floatToNilai(so - pokok)]);								
				so = so - pokok;
				if (so < pokok) pokok = so;
				else if ( i == lm - 2) pokok = so; 
			}else{					
				var value = annuity(bunga /12 / 100, lm - i, lm, so);					
				eval("value = "+value+";");
				this.sg.appendData([floatToNilai(value.totPayment),floatToNilai(value.pokok),floatToNilai(value.margin),floatToNilai(value.totPayment - value.pokok)]);								
				this.eAngsur.setText(floatToNilai(value.payment));
				margin = value.margin;
				pokok = value.pokok;
			}
			tot1 += pokok;
			tot2 += margin;
		}
		this.ePokok.setText(floatToNilai(tot1));
		this.eJasa.setText(floatToNilai(tot2));
	},
	doBeforePrint: function(sender){
		try{
			this.sgn.printHeader = "<span style='{font-size:15;font-weight:bold;font-family:arial;}'>SIMULASI PINJAMAN</span>"+
								"<table> "+		
									"<tr><td class='isi_laporan'>Plafon</td><td>:</td><td class='isi_laporan'>"+this.eNilai.getText()+"</td><td class='isi_laporan'>Angsuran</td><td>:</td><td class='isi_laporan'>"+this.eAngsur.getText()+"</td></tr>"+
									"<tr><td class='isi_laporan'>Bunga</td><td>:</td><td class='isi_laporan'>"+this.eBunga.getText()+"</td><td class='isi_laporan'>Jenis</td><td>:</td><td class='isi_laporan'>"+this.eJenis.getText()+"</td></tr>"+
									"<tr><td class='isi_laporan'>Jangka Waktu</td><td>:</td><td class='isi_laporan'>"+this.eLama.getText()+"</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>"+
								"</table>";
		}catch(e){
			systemAPI.alert(e);
		}								
	},
	sgnRefresh : function(){
		this.sgn.refreshPage();
	}
});
