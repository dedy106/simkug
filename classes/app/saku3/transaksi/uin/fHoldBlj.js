window.app_saku3_transaksi_uin_fHoldBlj = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fHoldBlj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fHoldBlj";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Hold Anggaran Belanja", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.c_tahun = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Hold","Daftar Hold"]});				
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
					 colTitle:["No Bukti","Tanggal","Keterangan","Pilih"],
					 colWidth:[[3,2,1,0],[70,300,100,100]],readOnly:true,
					 colFormat:[[3],[cfButton]],	
					 click:[this,"doSgBtnClick3"], colAlign:[[3],[alCenter]],													 
					 dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});			
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Pengajuan",click:[this,"doLoad3"]});				

		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:200});				
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,12,996,348], childPage:["Filter Data","Data Hold"]});										
		this.cb_giat = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Kegiatan", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_out = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Output", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_dout = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Detail Output", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_komp = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Komponen", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_dkomp = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Detail Komponen", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Kode Akun", multiSelection:false, maxLength:10, tag:7});
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Fak/Unit", multiSelection:false, maxLength:10, tag:7, change:[this,"doChange"]});				
		this.bAdd = new button(this.pc2.childPage[0],{bound:[120,18,98,18],caption:"Tambah Data",click:[this,"addHold"]});						
		
		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9, 
					colTitle:["KdGiat","KdOut","KdSOut","KdKmpnen","KdSKmpnen","KdAkun","KdUnit"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,100,100,100]],
					readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Fakultas/Unit",true);			
			
			var strSQL = "select distinct a.kdsatker,a.kdprogram,a.kddept,a.kdunit "+
						 "from uin_user a where a.nik ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.kddept = line.kddept;
					this.kdunit = line.kdunit;						
					this.kdsatker = line.kdsatker;
					this.kdprogram = line.kdprogram;											
				}
			}

			this.cb_giat.setSQL("select distinct a.kdgiat, a.nmgiat from uin_giat a inner join uin_user b on a.kddept=b.kddept and a.kdunit=b.kdunit and a.kdprogram=b.kdprogram and a.kdgiat=b.kdgiat where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kdgiat","nmgiat"],false,["Kode","Nama"],"and","Data Kegiatan",true);		

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fHoldBlj.extend(window.childForm);
window.app_saku3_transaksi_uin_fHoldBlj.implement({		
	addHold: function() {
		if (this.sg2.cells(0,0) == "") this.sg2.clear();
		if (this.cb_giat.getText() == "") var kdGiat = "-"; else var kdGiat = this.cb_giat.getText(); 
		if (this.cb_out.getText() == "") var kdOut = "-";  else var kdOut = this.cb_out.getText();
		if (this.cb_dout.getText() == "") var kdDout = "-";  else var kdDout = this.cb_dout.getText();
		if (this.cb_komp.getText() == "") var kdKomp = "-";  else var kdKomp = this.cb_komp.getText();
		if (this.cb_dkomp.getText() == "") var kdDkomp = "-";  else var kdDkomp = this.cb_dkomp.getText();
		if (this.cb_akun.getText() == "") var kdAkun = "-";  else var kdAkun = this.cb_akun.getText();
		if (this.cb_pp.getText() == "") var kdPP = "-";  else var kdPP = this.cb_pp.getText();

		this.sg2.appendData([kdGiat,kdOut,kdDout,kdKomp,kdDkomp,kdAkun,kdPP]);
		this.pc2.setActivePage(this.pc2.childPage[1]);

		this.cb_pp.setText("","");
		this.cb_akun.setText("","");
		this.cb_dkomp.setText("","");
		this.cb_komp.setText("","");
		this.cb_dout.setText("","");
		this.cb_out.setText("","");
		this.cb_giat.setText("","");
	},		
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from uin_usul_m where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update uin_usul_d set no_park='-' where no_park = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}
					
					var tahun=this.c_tahun.getText();
					sql.add("insert into uin_usul_m(no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_close,tgl_input,nik_user,total,form,status,kode_pp2) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+tahun+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','-','-',getdate(),'"+this.app._userLog+"',0,'BLJHOLD','HOLD','-')");
					
					var filter = "";		
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) ) {

								if (this.sg2.cells(0,i) == "-") filter = " and kdgiat like '%' "; else filter = " and kdgiat='"+this.sg2.cells(0,i)+"' ";
								if (this.sg2.cells(1,i) == "-") filter = filter + " and kdoutput like '%' "; else filter = " and kdgiat='"+this.sg2.cells(1,i)+"' ";
								if (this.sg2.cells(2,i) == "-") filter = filter + " and kdsoutput like '%' "; else filter = " and kdsoutput='"+this.sg2.cells(2,i)+"' ";
								if (this.sg2.cells(3,i) == "-") filter = filter + " and kdkmpnen like '%' "; else filter = " and kdkmpnen='"+this.sg2.cells(3,i)+"' ";
								if (this.sg2.cells(4,i) == "-") filter = filter + " and kdskmpnen like '%' "; else filter = " and kdskmpnen='"+this.sg2.cells(4,i)+"' ";
								if (this.sg2.cells(5,i) == "-") filter = filter + " and kode_akun like '%' "; else filter = " and kode_akun='"+this.sg2.cells(5,i)+"' ";
								if (this.sg2.cells(6,i) == "-") filter = filter + " and kode_pp like '%' "; else filter = " and kode_pp='"+this.sg2.cells(6,i)+"' ";

								sql.add("update uin_usul_d set no_park='"+this.e_nb.getText()+"' where no_park='-' and kode_lokasi='"+this.app._lokasi+"' "+filter);
								sql.add("insert into uin_hold_d(no_bukti,kode_lokasi,nu,kdgiat,kdoutput,kdsoutput,kdkmpnen,kdskmpnen,kode_akun,kode_pp) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(4,i)+"','"+this.sg2.cells(5,i)+"','"+this.sg2.cells(6,i)+"')");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from uin_usul_m where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update uin_usul_d set no_park='-' where no_park = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg2.clear(1); this.sg3.clear(1);
					setTipeButton(tbAllFalse);	
					this.pc1.setActivePage(this.pc1.childPage[0]);				
					this.pc2.setActivePage(this.pc2.childPage[0]);				
				}
				break;
			case "simpan" :	
			case "ubah" :													
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.c_tahun.setText(y);
		this.periode = (y+""+m);		
		
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);			
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg2.clear(1);				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"uin_usul_m","no_usul",this.app._lokasi+"-HLD"+this.c_tahun.getText().substr(2,2)+".","00000"));			
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},	
	doChange: function(sender){
		try{			
			if (sender == this.cb_giat && this.cb_giat.getText() != ""){
				this.cb_out.setSQL("select a.kdoutput, a.nmoutput from uin_output a inner join uin_pp_output b on a.kdoutput=b.kdoutput and a.kdgiat=b.kdgiat and b.kode_pp='"+this.cb_pp.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' where a.kdgiat='"+this.cb_giat.getText()+"'",["kdoutput","nmoutput"],false,["Kode","Nama"],"and","Data Output",true);
			}
			if (sender == this.cb_out && this.cb_out.getText() != ""){
				this.cb_dout.setSQL("select kdsoutput, nmsoutput from uin_soutput "+
									"where thang='"+this.c_tahun.getText()+"' and kddept='"+this.kddept+"' and kdunit ='"+this.kdunit+"' and kdprogram = '"+this.kdprogram+"' and kdgiat='"+this.cb_giat.getText()+"' and kdoutput='"+this.cb_out.getText()+"'"
									,["kdsoutput","nmsoutput"],false,["Kode","Nama"],"and","Data Output",true);
			}
			if (sender == this.cb_dout && this.cb_dout.getText() != ""){
				this.cb_komp.setSQL("select kdkmpnen, nmkmpnen from uin_kmpnen "+
									"where thang='"+this.c_tahun.getText()+"' and kddept='"+this.kddept+"' and kdunit ='"+this.kdunit+"' and kdprogram = '"+this.kdprogram+"' and kdgiat='"+this.cb_giat.getText()+"' and kdoutput='"+this.cb_out.getText()+"' and kdsoutput='"+this.cb_dout.getText()+"' "
									,["kdkmpnen","nmkmpnen"],false,["Kode","Nama"],"and","Data Komponen",true);
			}
			if (sender == this.cb_komp && this.cb_komp.getText() != ""){
				this.cb_dkomp.setSQL("select kdskmpnen, urskmpnen from uin_d_skmpnen "+
									"where thang='"+this.c_tahun.getText()+"' and kdsatker='"+this.kdsatker+"' and kddept='"+this.kddept+"' and kdunit ='"+this.kdunit+"' and kdprogram = '"+this.kdprogram+"' and kdgiat='"+this.cb_giat.getText()+"' and kdoutput='"+this.cb_out.getText()+"' and kdsoutput='"+this.cb_dout.getText()+"' and kdkmpnen='"+this.cb_komp.getText()+"' "
									,["kdskmpnen","urskmpnen"],false,["Kode","Nama"],"and","Data Detail Komponen",true);
			}
			if (sender == this.cb_dkomp && this.cb_dkomp.getText() != ""){
				this.cb_akun.setSQL("select a.kdakun, b.nmakun from uin_d_akun a inner join uin_akun b on a.kdakun=b.kdakun "+
									"where a.thang='"+this.c_tahun.getText()+"' and kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit ='"+this.kdunit+"' and a.kdprogram = '"+this.kdprogram+"' and a.kdgiat='"+this.cb_giat.getText()+"' and a.kdoutput='"+this.cb_out.getText()+"' and a.kdsoutput='"+this.cb_dout.getText()+"' and a.kdkmpnen='"+this.cb_komp.getText()+"' and a.kdskmpnen='"+this.cb_dkomp.getText()+"' "
									,["a.kdakun","a.nmakun"],false,["Kode","Nama"],"and","Data Akun",true);
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
	},
	doLoad3:function(sender){	
		try{		
			var strSQL = "select a.no_usul,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.total "+
						 "from uin_usul_m a "+
						 "where a.form='BLJHOLD' and a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.c_tahun.getText()+"' and a.status='HOLD' order by a.no_usul desc";													
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn3.rearrange();
				this.doTampilData3(1);
			} else this.sg3.clear(1);						
		}
		catch(e) {
			alert(e);
		}
	},		
	doTampilData3: function(page) {		
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg3.appendData([line.no_usul,line.tgl,line.keterangan,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 3) this.doDoubleClick3(this.sg3,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.pc2.setActivePage(this.pc2.childPage[1]);
				this.e_nb.setText(this.sg3.cells(0,row));	
														
				var data = this.dbLib.getDataProvider("select a.* from uin_usul_m a where a.no_usul='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.dp_d1.setText(line.tanggal);											
						this.e_ket.setText(line.keterangan);						
					} 
				}			
				var strSQL = "select * from uin_hold_d "+
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kdgiat,line.kdoutput,line.kdsoutput,line.kdkmpnen,line.kdskmpnen,line.kode_akun,line.kode_pp]);
					}					
				} else this.sg2.clear(1);	
				
			}
		} catch(e) {alert(e);}
	}
});