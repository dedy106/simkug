window.app_sc_transaksi_fPesan = function(owner)
{
	if (owner)
	{
		window.app_sc_transaksi_fPesan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_sc_transaksi_fPesan";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pemesanan: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"No Pesanan",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});							
		this.e_ket = new saiLabelEdit(this,{bound:[20,11,450,20],caption:"Nama Pesanan", maxLength:200});						
		this.e_peminta = new saiLabelEdit(this,{bound:[20,12,450,20],caption:"NIK Pemesan", readOnly :true});						
		this.e_cc = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Cost Center", readOnly :true});						
		this.cb_akun = new saiCBBL(this,{bound:[20,14,200,20],caption:"Kode Akun", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.cb_jenis = new saiCBBL(this,{bound:[20,15,200,20],caption:"Jenis Barang", multiSelection:false, maxLength:10,change:[this,"doChange"]});				
		this.e_nodin = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"Nota Dinas", maxLength:50});								
		this.i_attach = new portalui_imageButton(this,{bound:[475,16,20,20],hint:"Attach",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doAttach"]});
		this.e_telp = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"No Telpon PIC", maxLength:30});						
		this.e_alamat = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Alamat Penerima", maxLength:200});									
		this.e_catat = new saiLabelEdit(this,{bound:[20,19,450,20],caption:"Keterangan", maxLength:200});										
		this.e_total = new saiLabelEdit(this,{bound:[810,19,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
				
		this.pc1 = new pageControl(this,{bound:[20,12,990,260], childPage:["Data Item Pesanan","Data Anggaran"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
		            colTitle:["Kode Barang","Nama Barang","Spesifikasi","Satuan","Harga","Jumlah","Total","Due Date","Jam"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[50,80,80,80,70,50,240,200,80]],					
					columnReadOnly:[true,[6,4,3,2,1,0],[5,7,8]],
					buttonStyle:[[0,7,8],[bsEllips,bsDate,bsAuto]],
					picklist:[[8],[new portalui_arrayMap({items:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]})]],
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],checkItem: true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],					
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:5,tag:9,
		            colTitle:["Kode Akun","Periode","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[4,3,2,1,0],[100,100,100,80,80]],
					readOnly:true,colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[965,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
							
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			var data = this.dbLib.getDataProvider("select a.nik,a.nama,b.kode_cc,b.nama as nama_cc from sc_karyawan a inner join sc_cc b on a.kode_cc=b.kode_cc where a.nik='"+this.app._userLog+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.e_peminta.setText(line.nik+" - "+line.nama);
				this.e_cc.setText(line.kode_cc+" - "+line.nama_cc);
				this.peminta = line.nik;
				this.kodecc = line.kode_cc;
			}			
			this.cb_jenis.setSQL("select kode_jenis, nama from sc_jenis",["kode_jenis","nama"],false,["Kode","Nama"],"where","Data Jenis Barang",true);
			this.cb_akun.setSQL("select kode_akun, nama from masakun",["kode_akun","nama"],false,["Kode","Nama"],"where","Data Akun",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_sc_transaksi_fPesan.extend(window.childForm);
window.app_sc_transaksi_fPesan.implement({
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
	simpan: function(){			
		try{												
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into sc_pesan_m(no_pesan,keterangan,periode,tanggal,kode_cc,nik_buat,kode_jenis,no_app,nik_user,tgl_input,nilai,kode_akun,progress,nodin,alamat,no_tel,catatan,no_po,no_notif,no_terima,kode_vendor) values "+
						    "('"+this.e_nb.getText()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.kodecc+"','"+this.peminta+"','"+this.cb_jenis.getText()+"','-','"+this.app._userLog+"',getdate(),"+parseNilai(this.e_total.getText())+",'"+this.cb_akun.getText()+"','0','"+this.e_nodin.getText()+"','"+this.e_alamat.getText()+"','"+this.e_telp.getText()+"','"+this.e_catat.getText()+"','-','-','-','-')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into sc_pesan_d(no_pesan,no_urut,kode_brg,harga,jumlah,due_date,jam,no_po,no_terima,periode_gar,kode_vendor,catat_terima) values "+
										"	('"+this.e_nb.getText()+"',"+i+",'"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+",'"+this.sg.getCellDateValue(7,i)+"','"+this.sg.cells(8,i)+"','-','-','"+this.sg.getThnBln(7,i)+"','-','-')");
							}						
						}
					}									
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){																
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"	('"+this.e_nb.getText()+"','PESAN','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.kodecc+"','-','"+this.sg2.cells(1,i)+"','"+this.e_periode.getText()+"','D',"+parseNilai(this.sg2.cells(2,i))+","+parseNilai(this.sg2.cells(3,i))+")");
							}
						}
					}
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg2.clear(1); 			
					setTipeButton(tbSimpan);
					this.doClick();
				break;
			case "simpan" :	
				var data = this.dbLib.getDataProvider("select a.no_pesan from sc_pesan_d a inner join sc_pesan_m b on a.no_pesan=b.no_pesan "+
				                                      "                                    inner join sc_po_m c on a.no_po=c.no_po "+
													  "where b.kode_cc='"+this.kodecc+"' and c.no_bast<>'-' and a.no_terima='-' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						system.alert(this,"Transaksi tidak dapat disimpan.","Terdapat No Pesan yang belum diselesaikan (diterima). no bukti : "+line.no_pesan);
						return false;
					} 
				}			
				for (var i=0;i < this.sg.getRowCount();i++){										
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					} else {					
						if (this.sg.rowValid(i)){						
							for (var j=i;j < this.sg.getRowCount();j++){
								if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
									var k = i+1;
									system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
									return false;
								}
							}
						}
					}
				}								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();					
				this.doHitungGar();				
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (nilaiToFloat(this.sg2.cells(3,i))>0 && nilaiToFloat(this.sg2.cells(2,i)) < nilaiToFloat(this.sg2.cells(3,i))) {
						var k =i+1;
						system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
						return false;						
					}
				}				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pemesanan tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.doClick(this.i_gen);
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sc_pesan_m","no_pesan","UNIT-"+this.e_periode.getText().substr(2,2)+'.',"0000"));
		this.e_ket.setFocus();
	},	
	doChange:function(sender){
		try {
		if (sender == this.cb_jenis && this.cb_jenis.getText()!="") {			
			var data = this.dbLib.getDataProvider("select status_nodin from sc_jenis where kode_jenis='"+this.cb_jenis.getText()+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				if (line.status_nodin == "TIDAK") {
					this.e_nodin.setReadOnly = true;
				} 
				else {
					this.e_nodin.setReadOnly = false;
				}
			}			
		}
		} catch(e) {
		alert(e);}
	},
	doChangeCell: function(sender, col, row){		
		if ((col ==0) && (this.sg.cells(0,row) != "")) {
			var data = this.dbLib.getDataProvider("select tipe,satuan,harga from sc_barang where kode_brg = '"+this.sg.cells(0,row)+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];
				this.sg.cells(2,row,line.tipe);
				this.sg.cells(3,row,line.satuan);
				this.sg.cells(4,row,floatToNilai(line.harga));				
				if (this.sg.cells(5,row) != "") {
					var total = nilaiToFloat(this.sg.cells(4,row)) * nilaiToFloat(this.sg.cells(5,row));
					this.sg.cells(6,row,floatToNilai(total));				
				}
				this.sg.validasi();
			}
		}
		if ((col == 5) && (this.sg.cells(5,row) != "") && (this.sg.cells(4,row) != "")) {
			var total = nilaiToFloat(this.sg.cells(4,row)) * nilaiToFloat(this.sg.cells(5,row));
			this.sg.cells(6,row,floatToNilai(total));				
			this.sg.validasi();
		}		
	},
	doNilaiChange: function(){
		try{			
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != ""){				
					tot += nilaiToFloat(this.sg.cells(6,i));										
				}
			}
			this.e_total.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 7 : 
					this.sg.setCell(7,row,this.dp_d1.getText());					
				break;			
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{						
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Barang",sender,undefined, 
												  "select kode_brg,nama   from sc_barang where kode_jenis = '"+this.cb_jenis.getText()+"'",
												  "select count(kode_brg) from sc_barang where kode_jenis = '"+this.cb_jenis.getText()+"'",
												  ["kode_brg","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i)){				
				nilai = nilaiToFloat(this.sg.cells(6,i));				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){					
					if (this.sg.getThnBln(7,i) == this.sg2.cells(1,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.cb_akun.getText(),this.sg.getThnBln(7,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(3,idx));
					total = total + nilai;
					this.sg2.setCell(3,idx,total);
				}
			}
		}		
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){						
			var data = this.dbLib.getDataProvider("select fn_cekagg5('"+this.kodecc+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','-','"+this.sg2.cells(1,i)+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(2,i,floatToNilai(sls));	
				sls = sls - nilaiToFloat(this.sg2.cells(3,i));
				this.sg2.cells(4,i,floatToNilai(sls));				
			}			
		}			
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :				
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); 					
			setTipeButton(tbSimpan);
			this.doClick();
		} catch(e) {
			alert(e);
		}
	}
});