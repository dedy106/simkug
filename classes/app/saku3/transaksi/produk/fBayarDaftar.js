window.app_saku3_transaksi_produk_fBayarDaftar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fBayarDaftar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fBayarDaftar";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembayaran Pendaftaran Siswa", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});		
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		
		this.pc1 = new pageControl(this,{bound:[1,12,1000,410], childPage:["Data Pembayaran","Daftar Pembayaran"]});				
		
		this.e_nb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"No. Bukti",maxLength:20,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});	
		this.cb_kb = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Akun Kas Bank", multiSelection:false, maxLength:10, tag:2 });		
		this.cb_reg = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"ID Registrasi",multiSelection:false,tag:1,change:[this,"doChange"]});				
		this.e_tarif = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Tarif", maxLength:50, tag:1, tipeText:ttNilai, text:"0"});							

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:2,
		            colTitle:["No. Bukti","ID Registrasi","Nama","Tarif"],
					colWidth:[[3,2,1,0],[100,350,150,150]],
					colFormat:[[3],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad3 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});				
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doClick();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);				

			this.cb_kb.setSQL("select a.kode_akun,a.nama from masakun a where  a.kode_lokasi = '"+this.app._lokasi+"' ",["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);			
			this.cb_reg.setSQL("select no_reg, nama from sis_siswareg where kode_lokasi = '"+this.app._lokasi+"'",["no_reg","nama"],false,["No. Registrasi","Nama"],"and","Data Regsitrasi",true);

			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='REGPDPT' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunPdpt = line.flag;
			} else this.akunPdpt = "";
			
			if (this.akunPdpt == "") {
				system.alert(this,"SPRO PDPT (REGPDPT) tidak ditemukan.","");
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fBayarDaftar.extend(window.childForm);
window.app_saku3_transaksi_produk_fBayarDaftar.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','V','KBBILLREG','X','0','0','"+this.kodePP+"','"+this.dp_d1.getDateString()+"','-','Pembayaran Registrasi Siswa No. : "+this.cb_reg.getText()+
							"','IDR',1,"+nilaiToFloat(this.e_tarif.getText())+",0,0,'-','-','-','-','-','-','"+this.cb_reg.getText()+"','"+this.cb_kb.getText()+"','-')");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_kb.getText()+"','D',"+parseNilai(this.e_tarif.getText())+","+parseNilai(this.e_tarif.getText())+",'Pembayaran Registrasi Siswa No. "+this.cb_reg.getText()+"','BILLREG','-','IDR',1,'"+this.kodePP+"','-','-','-','-','-','-','-','-')");
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunPdpt+"','C',"+parseNilai(this.e_tarif.getText())+","+parseNilai(this.e_tarif.getText())+",'Pembayaran Registrasi Siswa No. "+this.cb_reg.getText()+"','BILLREG','-','IDR',1,'"+this.kodePP+"','-','-','-','-','-','-','-','-')");
							
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
	
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbAllFalse);
				this.sg1.clear();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.doClick();
				break;
			case "simpan" :
			case "ubah" :		
				 this.simpan();					
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
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},

	doClick:function(sender){	
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));
		setTipeButton(tbSimpan);
	},

	doChange: function(sender){
		try{				
			if (this.cb_reg.getText() != ""){
				var strSQL = "select a.kode_pp,b.tarif from sis_siswareg a inner join sis_tarif_daftar b on a.kode_pp=b.kode_pp where a.no_reg ='"+this.cb_reg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_tarif.setText(floatToNilai(line.tarif));																 
						this.kodePP = line.kode_pp;
					}
				}
			}							
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doDoubleClick: function(sender, col , row) {
	try{
		if (this.sg1.cells(0,row) != "") {			
			setTipeButton(tbUbahHapus);
			this.pc1.setActivePage(this.pc1.childPage[0]);														
			this.e_nb.setText(this.sg1.cells(0,row));	

			var strSQL = "select no_ref1,nilai1,param1,param2 from trans_m where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.cb_reg.setText(line.param1);																 
					this.e_tarif.setText(line.nilai1);
					this.cb_kb.setText(line.param2);																 																 
					this.kodePP = line.kode_pp;
				}
			}					
		}
	} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
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
			this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},

	doLoad:function(sender){								
		var strSQL = "select a.no_bukti, a.no_ref1, a.nilai1, b.nama from trans_m a inner join sis_siswareg b on a.no_ref1 = b.no_reg where a.form='KBBILLREG' and a.kode_lokasi='"+this.app._lokasi+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},
	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_bukti,line.no_ref1,line.nama,line.nilai1]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	}, 
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
