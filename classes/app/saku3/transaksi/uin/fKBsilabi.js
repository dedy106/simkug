window.app_saku3_transaksi_uin_fKBsilabi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fKBsilabi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fKBsilabi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan SILABI", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.c_tahun = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,470], childPage:["Data SILABI","Daftar SILABI"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
		             colTitle:["No Bukti","Tanggal","Keterangan","Pilih"],
					 colWidth:[[3,2,1,0],[70,300,100,100]],readOnly:true,	
					 colFormat:[[3],[cfButton]],	
					 click:[this,"doSgBtnClick1"], colAlign:[[3],[alCenter]],					 				 
					 dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Pengajuan",click:[this,"doLoad"]});				

		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 				
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:200});				
		this.cb_rek = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Rekening", multiSelection:false, maxLength:10, tag:2});
		this.cb_silabi = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Bukti SILABI", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"No SILABI", readOnly:true});				
		this.e_tglsil = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Tgl SILABI", readOnly:true});				
		this.e_file = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"File Upload", readOnly:true, tag:9});		
		this.bLihat = new button(this.pc1.childPage[0],{bound:[480,15,80,18],caption:"Lihat File",click:[this,"doLihat"]});			
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,15,200,20],caption:"Total Nilai Masuk", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,12,995,253], childPage:["Daftar Agenda","Detail RAB","Controlling"]});								
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9,
					colTitle:["Fak/Unit","No Agenda","Tanggal","Deskripsi","Nilai","Ni Masuk","Detail"],
					colWidth:[[6,5,4,3,2,1,0],[80,100,100,290,80,100,200]],					
					columnReadOnly:[true,[0,1,2,3,4,6],[5]],										
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfButton]],					
					click:[this,"doSgBtnClick"], colAlign:[[6],[alCenter]],		
					nilaiChange:[this,"doNilaiChange"],	change:[this,"doChangeCell"],						
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});		

		this.sg4 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:12,tag:9,
					colTitle:["KdTrm","Nama Penerima","Deskripsi","IDItem","Satuan","Harga","Vol","Jumlah","PPN","PPh","Total","KdAkun"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,60,60,80,60,60,60,60,200,200,80]],					
					colHide:[[0,3],[true,true]],
					readOnly:true,				
					colFormat:[[5,6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],												
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4});		

		this.sg2 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:8,tag:9, 
					colTitle:["KdGiat","KdOut","KdSOut","KdKmpnen","KdSKmpnen","KdAkun","Saldo Budget","Ni Pengajuan"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100]],
					colFormat:[[6,7],[cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});		

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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
			
			this.cb_rek.setSQL("select kode_rek, nama from uin_rek where kode_lokasi='"+this.app._lokasi+"'",["kode_rek","nama"],false,["Kode","Nama"],"and","Data Rekening",true);			

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('UINTTP') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "UINTTP") this.akunTitip = line.flag;					
				}
			}

			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fKBsilabi.extend(window.childForm);
window.app_saku3_transaksi_uin_fKBsilabi.implement({
	isiCBsilabi: function() {
		this.cb_silabi.setSQL("select no_sppd, keterangan from uin_sppd_m where no_kas='-' and kode_lokasi='"+this.app._lokasi+"'",["no_sppd","keterangan"],false,["ID Silabi","Deskripsi"],"and","Data SILABI",true);			
	},
	doLihat: function(sender){
		try{
			if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());			
		}catch(e){
			alert(e);
		}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					

					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
						sql.add("delete from uin_silabi_kas where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
						sql.add("update uin_sppd_m set no_kas='-' where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}				
					
					var data = this.dbLib.getDataProvider("select kdakun from uin_rek where kode_rek='"+this.cb_rek.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){			
							this.kdAkun = line.kdakun;
						} 
					}
									
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.periode+"','KB','KBSILBI','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+",0,0,'"+this.app._userLog+"','-','-','"+this.cb_silabi.getText()+"','-','-','"+this.cb_rek.getText()+"','-','-')");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.periode+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.kdAkun+"','D',"+parseNilai(this.e_total.getText())+","+
							parseNilai(this.e_total.getText())+",'"+this.e_ket.getText()+"','KBSILBI','KB','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.periode+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.akunTitip+"','C',"+parseNilai(this.e_total.getText())+","+
							parseNilai(this.e_total.getText())+",'"+this.e_ket.getText()+"','KBSILBI','TTP','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
					
					sql.add("update uin_sppd_m set no_kas='"+this.e_nb.getText()+"' where no_sppd = '"+this.cb_silabi.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(5,i) != "0") {
								sql.add("insert into uin_silabi_kas (no_bukti,kode_lokasi,no_aju,nilai) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(1,i)+"',"+nilaiToFloat(this.sg.cells(5,i))+")");
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
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					sql.add("delete from uin_silabi_kas where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					sql.add("update uin_sppd_m set no_kas='-' where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1); this.sg4.clear(1);					
					setTipeButton(tbAllFalse);						
					this.pc1.setActivePage(this.pc1.childPage[0]);				
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.isiCBsilabi();				
				}
				break;
			case "simpan" :	
			case "ubah" :
				this.sg.validasi();	
				if (nilaiToFloat(this.e_total.getText()) <= 0 )	{
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
			this.isiCBsilabi();	
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1); 		
				this.bLihat.hide();		
				this.isiCBsilabi();	
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BM"+this.c_tahun.getText().substr(2,2)+".","00000"));			
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},	
	doChange:function(sender){
		if (sender == this.cb_silabi && this.cb_silabi.getText()!="") {
			var data = this.dbLib.getDataProvider("select no_dokumen,no_gambar,convert(varchar,tgl_sppd,103) as tgl from uin_sppd_m where no_sppd='"+this.cb_silabi.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){			
					this.e_dok.setText(line.no_dokumen);											
					this.e_tglsil.setText(line.tgl);
					this.e_file.setText(line.no_gambar);
				} 
			}	
			var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan, a.nilai-a.ppn-a.pph as nilai, a.kode_pp+' | '+b.nama as pp,isnull(c.nilai,0) as nilai_kas "+
						 "from uin_aju_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "left join ("+
						 "			select no_aju,kode_lokasi,nilai from uin_silabi_kas where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 ") c on a.no_aju=c.no_aju and a.kode_lokasi=c.kode_lokasi "+
						 "where a.no_sppd='"+this.cb_silabi.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_pp,a.no_aju";							 											 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];						
					this.sg.appendData([line.pp,line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.nilai_kas),"Detail"]);
				}					
			} else this.sg.clear(1);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 6) {
				this.noaju = this.sg.cells(1,row);
				var strSQL = "select a.*,c.nama as atensi, a.total-a.ppn-a.pph as neto , a.idbukti+cast(a.nu as varchar) as iditem "+
							"from uin_aju_d a inner join uin_atensi c on a.kode_atensi=c.kode_atensi and a.kode_lokasi=c.kode_lokasi "+
							"where a.no_aju = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";					 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.kode_atensi,line.atensi,line.keterangan,line.iditem,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.neto),line.kode_akun]);
					}					
				} else this.sg4.clear(1);	

				var strSQL = "select * from uin_aju_r where no_aju = '"+this.sg.cells(1,row)+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kdgiat,line.kdoutput,line.kdsoutput,line.kdkmpnen,line.kdskmpnen,line.kode_akun,floatToNilai(line.saldo),floatToNilai(line.nilai)]);
					}					
				} else this.sg2.clear(1);	

				this.pc2.setActivePage(this.pc2.childPage[1]);	
			}
		}catch(e){
			alert(e);
		}
	},		
	doChangeCell: function(sender, col, row){
		if (col == 5) this.sg.validasi();
	},
	doNilaiChange: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != ""){					
					tot += nilaiToFloat(this.sg.cells(5,i));						
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
						if (result.toLowerCase().search("error") == -1)	{													
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
	doLoad:function(sender){	
		try{					
			var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
						 "from trans_m a "+						 
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode like '"+this.c_tahun.getText()+"%' and a.posted='F' and a.form='KBSILBI' order by a.no_bukti desc";							 						
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);						
		}
		catch(e) {
			alert(e);
		}
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_bukti,line.tgl,line.keterangan,"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgBtnClick1: function(sender, col, row){
		try{
			if (col === 3) this.doDoubleClick1(this.sg1,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.bLihat.show();
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.e_nb.setText(this.sg1.cells(0,row));	
														
				var data = this.dbLib.getDataProvider("select * from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.dp_d1.setText(line.tanggal);																												
						this.e_ket.setText(line.keterangan);
						this.cb_rek.setText(line.param1);
						this.cb_silabi.setSQL("select no_sppd, keterangan from uin_sppd_m where no_sppd='"+line.no_ref1+"' and kode_lokasi='"+this.app._lokasi+"'",["no_sppd","keterangan"],false,["ID Silabi","Deskripsi"],"and","Data SILABI",true);			
						this.cb_silabi.setText(line.no_ref1);
					} 
				}			

			}
		} catch(e) {alert(e);}
	}	
});