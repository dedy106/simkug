window.app_patra_piutang_fPiutang = function(owner)
{
	if (owner)
	{
		window.app_patra_piutang_fPiutang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_patra_piutang_fPiutang";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Piutang: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Invoice", underline:true});		
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 				
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,225,20],caption:"No Invoice", maxLength:30});				
		this.e_fp = new saiLabelEdit(this,{bound:[20,14,225,20],caption:"No FP", maxLength:30});				
		this.e_link = new saiLabelEdit(this,{bound:[20,17,300,20],caption:"Link/Lokasi", maxLength:50});		
		this.e_pakai = new saiLabelEdit(this,{bound:[20,18,300,20],caption:"Per. Pemakaian", maxLength:50});						
		this.c_jenis = new saiCB(this,{bound:[20,13,180,20],caption:"Jenis Tagihan",items:["BLNINI","BLNLALU"], readOnly:true,tag:2});
		this.e_usd = new saiLabelEdit(this,{bound:[700,13,220,20],caption:"Nilai Original", tag:1, readOnly:true, tipeText:ttNilai, text:"0", change:[this,"doChange"]});				
		this.c_curr = new saiCB(this,{bound:[20,19,180,20],caption:"Curr - Kurs",items:["IDR","USD"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this,{bound:[220,19,100,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"]});						
		this.e_idr = new saiLabelEdit(this,{bound:[700,19,220,20],caption:"Nilai Konversi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_cust = new saiCBBL(this,{bound:[20,16,200,20],caption:"Customer", multiSelection:false, maxLength:10, tag:2});				
		this.e_ppnusd = new saiLabelEdit(this,{bound:[700,16,220,20],caption:"PPN Original", tag:1, tipeText:ttNilai, text:"0", change:[this,"doChange"]});				
		this.cb_akun = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun Piutang", multiSelection:false, maxLength:10, tag:2});
		this.e_ppnidr = new saiLabelEdit(this,{bound:[700,18,220,20],caption:"PPN Konversi", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		
		this.p1 = new panel(this,{bound:[20,23,900,250],caption:"Data Item Jurnal Pendapatan"});		
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:5,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai"],
					colWidth:[[4,3,2,1,0],[100,350,50,250,100]],					
					columnReadOnly:[true,[1],[0,2,3,4]],
					buttonStyle:[[0,2],[bsEllips,bsAuto]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_cust.setSQL("select kode_cust, nama from patra_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						       "where b.kode_flag = '003' and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun Piutang",true);									
			
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='PPNK' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunppn = line.flag;
			} 
			else {
				system.alert(this,"Akun PPN tidak valid.","Harap seting di sistem prosedur utk kode PPNK.");
				setTipeButton(tbAllFalse);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_patra_piutang_fPiutang.extend(window.childForm);
window.app_patra_piutang_fPiutang.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"patra_ar_m","no_ar",this.app._lokasi+"-PU"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into patra_ar_m(no_ar,kode_lokasi,periode,tanggal,no_dokumen,no_fp,tgl_invoice,link,keterangan,kode_pp,modul,jenis,kode_curr,kurs,kode_cust,kode_klpjasa,akun_ar,nilai_curr,nilai,ppn_curr,ppn,posted,tgl_input,nik_user,dc,no_arref) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_fp.getText()+"','"+this.dp_d2.getDateString()+"','"+this.e_link.getText()+"','"+this.e_pakai.getText()+"','"+this.app._kodePP+"','PIU','"+this.c_jenis.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.cb_cust.getText()+"','-','"+this.cb_akun.getText()+"',"+parseNilai(this.e_usd.getText())+","+parseNilai(this.e_idr.getText())+","+parseNilai(this.e_ppnusd.getText())+","+parseNilai(this.e_ppnidr.getText())+",'F',getdate(),'"+this.app._userLog+"','D','-')");					
					
					totusd = nilaiToFloat(this.e_usd.getText()) + nilaiToFloat(this.e_ppnusd.getText());
					totidr = nilaiToFloat(this.e_idr.getText()) + nilaiToFloat(this.e_ppnidr.getText());
					sql.add("insert into patra_ar_j(no_ar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,nilai_curr,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+0+",'"+this.cb_akun.getText()+"','"+this.e_pakai.getText()+"','D',"+totidr+","+totusd+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PIU','PIU','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate())");
					if (this.sg.getRowValidCount() > 0){
						var nilaiIDR = j = 0;
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								j=i+1;
								nilaiIDR = Math.round(nilaiToFloat(this.sg.cells(4,i)) * nilaiToFloat(this.e_kurs.getText()));
								sql.add("insert into patra_ar_j(no_ar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,nilai_curr,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+nilaiIDR+","+parseNilai(this.sg.cells(4,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PIU','PDPT','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate())");
							}
						}
					}		
					if (this.e_ppnusd.getText()!="0") {
						sql.add("insert into patra_ar_j(no_ar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,nilai_curr,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+999+",'"+this.akunppn+"','PPN','C',"+parseNilai(this.e_ppnidr.getText())+","+parseNilai(this.e_ppnusd.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PIU','PPN','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate())");
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
					this.sg.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				//sg gak di validasi soalnya ppn bisa diedit...
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
					}
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);										
				if (nilaiToFloat(this.e_usd.getText()) <= 0 || nilaiToFloat(this.e_idr.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Original atau Konversi tidak boleh nol atau kurang.");
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
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"patra_ar_m","no_ar",this.app._lokasi+"-PU"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
	},
	doChange:function(sender){
		if (sender == this.c_curr) {
			if (this.c_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); this.e_kurs.setText("1"); this.sg.validasi();
			}
			else {
				this.e_kurs.setReadOnly(false); this.e_kurs.setText("0"); this.sg.validasi();
			}
		}
		if (sender == this.e_kurs) {
			this.sg.validasi();
		}
		if (sender == this.e_usd) {
			if (this.e_usd.getText()!= "" && this.e_usd.getText()!= "0") {
				if (this.c_curr.getText() != "IDR")
					this.e_ppnusd.setText(floatToNilai(nilaiToFloat(this.e_usd.getText()) * 10/100));
				else this.e_ppnusd.setText(floatToNilai(Math.round(nilaiToFloat(this.e_usd.getText()) * 10/100)));
				this.e_ppnidr.setText(floatToNilai(Math.round(nilaiToFloat(this.e_idr.getText()) * 10/100)));
			}
		}
		if (sender == this.e_ppnusd) {			
			if (this.e_ppnusd.getText()!= "") {
				this.e_ppnidr.setText(floatToNilai(Math.round(nilaiToFloat(this.e_ppnusd.getText()) * nilaiToFloat(this.e_kurs.getText()))));
			}		
		}
	},
	doChangeCell: function(sender, col, row){
		//if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
		this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");				
	},
	doNilaiChange: function(){
		try{
			var tot1 = tot2 = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "C") {
						tot1 += nilaiToFloat(this.sg.cells(4,i));
						tot2 += Math.round(nilaiToFloat(this.sg.cells(4,i)) * nilaiToFloat(this.e_kurs.getText()));
					}
					if (this.sg.cells(2,i).toUpperCase() == "D") {
						tot1 -= nilaiToFloat(this.sg.cells(4,i));
						tot2 -= Math.round(nilaiToFloat(this.sg.cells(4,i)) * nilaiToFloat(this.e_kurs.getText()));
					}
				}
			}
			this.e_usd.setText(floatToNilai(tot1));
			this.e_idr.setText(floatToNilai(tot2));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;			
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												  "where b.kode_flag = '022' and  a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												  "where b.kode_flag = '022' and  a.kode_lokasi='"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
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
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			this.c_curr.setText("IDR");
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});