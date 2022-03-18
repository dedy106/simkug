window.app_saku2_transaksi_aka_fMutasiPDDTU = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fMutasiPDDTU.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_fMutasiPDDTU";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Mutasi PDD", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl;portalui_saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		
		this.cb_kas = new saiCBBL(this,{bound:[20,15,220,20],caption:"Bukti Kas", multiSelection:false, tag:2,change:[this,"doChange"]});
		this.cb_nim = new saiCBBL(this,{bound:[20,16,220,20],caption:"NIM", multiSelection:false,  tag:1,change:[this,"doChange"]});
		this.e_idbank = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"ID Bank",readOnly:true});		
		this.e_saldo = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Saldo", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_total = new saiLabelEdit(this,{bound:[320,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.p1 = new panel(this,{bound:[20,23,500,300],caption:"Daftar Mutasi"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:3,tag:9,				
				colTitle:["NIM","Nama","Nilai"],
				colWidth:[[2,1,0],[80,220,80]],
				columnReadOnly:[true,[1],[0,2]],				
				buttonStyle:[[0],[bsEllips]], colFormat:[[2],[cfNilai]],
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		
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
			
			this.cb_kas.setSQL("select no_kas, keterangan from kas_m where modul='KBTTP' and kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["Bukti","Keterangan"],"and","Daftar KasBank",true);			
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_fMutasiPDDTU.extend(window.childForm);
window.app_saku2_transaksi_aka_fMutasiPDDTU.implement({		
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into aka_mutasi_pdd (no_mutasi,kode_lokasi,periode,tanggal,keterangan,nilai,nik_user,tgl_input,no_kas,nim) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'"+this.e_userLog+"',getdate(),'"+this.cb_kas.getText()+"','"+this.cb_nim.getText()+"')")
					
					var mutasiC = nilaiToFloat(this.e_total.getText()) * -1;
					sql.add("insert into aka_depo_d (no_bukti,kode_lokasi, nim,nim_seb,id_bank,periode,nilai,keterangan,modul,no_rekon,nama) values "+
							"('"+this.cb_kas.getText()+"','"+this.app._lokasi+"', '"+this.cb_nim.getText()+"','-','"+this.e_idbank.getText()+"','"+this.e_periode.getText()+"',"+mutasiC+",'-','MUT_C','"+this.e_nb.getText()+"','"+this.cb_nim.getRightLabelCaption()+"')");
									
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) 
							sql.add("insert into aka_depo_d (no_bukti,kode_lokasi, nim,nim_seb,id_bank,periode,nilai,keterangan,modul,no_rekon,nama) values "+
									"('"+this.cb_kas.getText()+"','"+this.app._lokasi+"', '"+this.sg.cells(0,i)+"','-','"+this.e_idbank.getText()+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg.cells(2,i))+",'-','MUT_D','"+this.e_nb.getText()+"','"+this.sg.cells(1,i)+"')");
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
				if (nilaiToFloat(this.e_saldo.getText()) <= 0 || nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Saldo dan Nilai tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_saldo.getText()) < nilaiToFloat(this.e_total.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh melebihi Saldo.");
					return false;						
				}				
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_mutasi_pdd","no_mutasi",this.app._lokasi+"-MUT"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();			
	},
	doChange:function(sender){
		if (sender == this.cb_kas && this.cb_kas.getText()!="") {
			this.e_saldo.setText("0");
			this.cb_nim.setSQL("select distinct nim, nama from aka_depo_d where no_bukti='"+this.cb_kas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nim","nama"],false,["NIM","Nama"],"and","Daftar MHS",true);			
		}
		if (sender == this.cb_nim && this.cb_nim.getText()!="") {
			var data = this.dbLib.getDataProvider("select id_bank,sum(nilai) as saldo from aka_depo_d where nim='"+this.cb_nim.getText()+"' and no_bukti ='"+this.cb_kas.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by id_bank",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.e_idbank.setText(line.id_bank);
					this.e_saldo.setText(floatToNilai(line.saldo));
				}				
			}			
		}
	},	
	doChangeCell: function(sender, col, row){		
		if (col == 2 && sender.cells(2,row) != "") this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var data = this.dbLib.getDataProvider("select nama from aka_mahasiswa where nim='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						sender.cells(1,row,line.nama);
					}	
					else {
						sender.cells(0,row,"");
						sender.cells(1,row,"");
					}
				}
				else {
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Mahasiswa",sender,undefined, 
												  "select nim,nama    from aka_mahasiswa where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(nim) from aka_mahasiswa where kode_lokasi = '"+this.app._lokasi+"'",
												  ["nim","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doNilaiChange: function(){		
		try{
			var tot = 0;						
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(2,i) != ""){
					tot += nilaiToFloat(this.sg.cells(2,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;						
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});
