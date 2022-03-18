window.app_saku3_transaksi_uin_fParkingBlj = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fParkingBlj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fParkingBlj";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Parking Anggaran Belanja", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.c_tahun = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Parking","Daftar Parking"]});				
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
					 colTitle:["No Bukti","Tanggal","Keterangan","Total","Pilih"],
					 colWidth:[[4,3,2,1,0],[70,100,300,100,100]],readOnly:true,
					 colFormat:[[3,4],[cfNilai,cfButton]],	
					 click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 
					 dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});			
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Pengajuan",click:[this,"doLoad3"]});				

		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:200});				
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,17,200,20],caption:"Total Parked", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,12,996,348], childPage:["Filter Data","Detail Anggaran"]});										
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Fak/Unit", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});		
		this.cb_giat = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Kegiatan", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_out = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Output", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_dout = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Detail Output", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_komp = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Komponen", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_dkomp = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Detail Komponen", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Kode Akun", multiSelection:false, maxLength:10, tag:7});
		this.bCari = new button(this.pc2.childPage[0],{bound:[120,16,98,18],caption:"Tampil Data",click:[this,"loadData"]});						
		
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:10,tag:8,
		            colTitle:["Status","IDitem","Idx","Deskripsi","Kd Norma","Norma","Satuan","Harga","Vol","Jumlah"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,60,80,60,150,60,320,40,100,70]],					
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],		
					colHide:[[4],[true]],			
					colFormat:[[7,8,9],[cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["PARKED","AKTIF"]})]],
					dblClick:[this,"doDoubleClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],					
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});		
		this.bAll = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/tabCont2.png", hint:"Parked All",click:[this,"doAll"]});				

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
			this.cb_pp.setText(this.app._kodePP);
			
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

			var data = this.dbLib.getDataProvider("select a.tahun,isnull(b.no_close,'-') as no_close from uin_tahun a left join uin_close_m b on a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi where a.flag_aktif='1' order by a.tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.c_tahun.setText(line.tahun);	

				if (line.no_close == "-") setTipeButton(tbSimpan);
				else {
					this.c_tahun.setText("");
					system.alert(this,"Closing Budget sudah dilakukan.","Parking tidak dapat dilakukan.");
					setTipeButton(tbAllFalse);
				}
			}

			this.cb_giat.setSQL("select distinct a.kdgiat, a.nmgiat from uin_giat a inner join uin_user b on a.kddept=b.kddept and a.kdunit=b.kdunit and a.kdprogram=b.kdprogram where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kdgiat","nmgiat"],false,["Kode","Nama"],"and","Data Kegiatan",true);		

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fParkingBlj.extend(window.childForm);
window.app_saku3_transaksi_uin_fParkingBlj.implement({		
	loadData: function() {
		var filter = "";
		if (this.cb_giat.getText() != "") filter = " and a.kdgiat='"+this.cb_giat.getText()+"' ";
		if (this.cb_out.getText() != "") filter = filter + " and a.kdoutput='"+this.cb_out.getText()+"' ";
		if (this.cb_dout.getText() != "") filter = filter + " and a.kdsoutput='"+this.cb_dout.getText()+"' ";
		if (this.cb_komp.getText() != "") filter = filter + " and a.kdkmpnen='"+this.cb_komp.getText()+"' ";
		if (this.cb_dkomp.getText() != "") filter = filter + " and a.kdskmpnen='"+this.cb_dkomp.getText()+"' ";
		if (this.cb_akun.getText() != "") filter = filter + " and a.kode_akun='"+this.cb_akun.getText()+"' ";

		var strSQL = "select 'AKTIF' as status,a.idbukti,a.nu,a.keterangan,a.kode_norma,c.nama,a.satuan,a.tarif,sum(a.vol) as vol,sum(a.total) as total  "+
					 "from uin_usul_d a "+
					 "		inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi and b.no_close='-' "+
					 "		inner join uin_norma c on a.kode_norma=c.kode_norma and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+					 
					 "where a.no_park='-' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.tahun='"+this.c_tahun.getText()+"' and a.kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit='"+this.kdunit+"' and a.kdprogram='"+this.kdprogram+"' "+
					 filter+
					 "group by a.idbukti,a.nu,a.keterangan,a.kode_norma,c.nama,a.satuan,a.tarif "+
					 "order by a.idbukti,a.nu";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			var vol = total = 0;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];		
				this.sg.appendData([line.status.toUpperCase(),line.idbukti,line.nu,line.keterangan,line.kode_norma,line.nama,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total)]);
			}
			this.sg.validasi();
		} else this.sg.clear(1);	
		this.pc2.setActivePage(this.pc2.childPage[1]);	
	},	
	doAll: function() {
		if (this.sg.getRowValidCount() > 0){
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) {
					this.sg.cells(0,i,"PARKED");
				}
			}
		}
		this.sg.validasi();
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
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+tahun+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','-','-',getdate(),'"+this.app._userLog+"',"+nilaiToFloat(this.e_total.getText())+",'BLJPARK','PARK','-')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "PARKED") {
								sql.add("update uin_usul_d set no_park='"+this.e_nb.getText()+"' where kode_lokasi='"+this.app._lokasi+"' and idbukti='"+this.sg.cells(1,i)+"' and nu="+this.sg.cells(2,i)+" ");
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
					this.sg.clear(1); this.sg3.clear(1);
					setTipeButton(tbAllFalse);	
					this.pc1.setActivePage(this.pc1.childPage[0]);				
					this.pc2.setActivePage(this.pc2.childPage[0]);				
				}
				break;
			case "simpan" :	
			case "ubah" :													
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total harus lebih dari nol.");
					return false;
				}
				else
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
				this.sg1.clear(1);				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"uin_usul_m","no_usul",this.app._lokasi+"-BPR"+this.c_tahun.getText().substr(2,2)+".","00000"));			
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
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "AKTIF") this.sg.cells(0,row,"PARKED");
		else this.sg.cells(0,row,"AKTIF");
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) this.sg.validasi();
	},
	doNilaiChange: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(9,i) != "" && this.sg.cells(0,i)=="PARKED"){					
					tot += nilaiToFloat(this.sg.cells(9,i));						
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("doNilaiChange: "+e);
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
						 "where a.no_close='-' and a.form='BLJPARK' and a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.c_tahun.getText()+"' and a.status='PARK' order by a.no_usul desc";													
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
			this.sg3.appendData([line.no_usul,line.tgl,line.keterangan,floatToNilai(line.total),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick3(this.sg3,0,row);						
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
				var strSQL = "select 'PARKED' as status,a.*,b.nama "+
							 "from uin_usul_d a inner join uin_norma b on a.kode_norma=b.kode_norma and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_park = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.status.toUpperCase(),line.idbukti,line.nu,line.keterangan,line.kode_norma,line.nama,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total)]);
					}					
				} else this.sg.clear(1);	
				this.sg.validasi();			
			}
		} catch(e) {alert(e);}
	}
});