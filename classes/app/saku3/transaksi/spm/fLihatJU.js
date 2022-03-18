window.app_saku3_transaksi_spm_fLihatJU = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spm_fLihatJU.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fLihatJU";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Lihat Jurnal Umum", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");	

		this.pc1 = new pageControl(this,{bound:[10,18,1000,450], childPage:["Filter Data","Data JU"]});
		this.e_tahun = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,150,20],caption:"Tahun",tag:9,maxLength:4});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,400,20],caption:"Keterangan", tag:9});				
		this.bCari = new button(this.pc1.childPage[0],{bound:[120,13,98,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:9,
		            colTitle:["No Bukti","Tanggal","Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,80,100,300,50,150,80,80,100]],					
					readOnly:true,
					colFormat:[[6],[cfNilai]],					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			
			this.e_tahun.setText("2018");
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spm_fLihatJU.extend(window.childForm);
window.app_saku3_transaksi_spm_fLihatJU.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},	
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1","9"),undefined);
					this.sg1.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);															
				break;					
		}
	},					
	doCari:function(sender){		
		var filter = " where substring(a.periode,1,4) = '"+this.e_tahun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";		
		filter = filter+" and a.keterangan like '"+this.e_ket.getText()+"%' ";		
		
		var strSQL = "select a.no_ju,convert(varchar,a.tanggal,103) as tanggal, c.kode_akun,c.nama as nama_akun,a.dc,a.keterangan,a.nilai,b.kode_pp,b.nama as nama_pp "+
		             "from ju_j a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 
					 "inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					 filter + " order by a.no_ju,a.dc desc";					 					

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg1.appendData([line.no_ju,line.tanggal,line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}		
});