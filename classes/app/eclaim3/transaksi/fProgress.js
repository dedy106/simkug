window.app_eclaim3_transaksi_fProgress = function(owner)
{
	if (owner)
	{
		window.app_eclaim3_transaksi_fProgress.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim3_transaksi_fProgress";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Progress Pekerjaan: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,500], childPage:["Data Klaim","Detail Klaim","Histori","Filter Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:13,tag:0,
		            colTitle:["No Klaim","Tgl Klaim","N Estimasi","No Polis","No Dokumen","Tgl Dok","Lokasi Kejadian","Loker","Penyebab","Object","PIC","No Telp","Status"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,150,200,200,150,200,70,100,150,100,70,100]],
					readOnly:true,colFormat:[[2],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Progress",maxLength:30,readOnly:true,visible:false});				
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 				
		
		this.e_noklaim = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"No Klaim", readOnly:true});
		this.e_tglklaim = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Tanggal Klaim", readOnly:true});				
		this.e_nopolis = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"No Polis", readOnly:true});		
		this.e_nodok = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,450,20],caption:"Dok. Klaim", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Nilai Estimasi", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_tgldok = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Tanggal Dok", readOnly:true});		
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Lok. Kejadian", readOnly:true});
		this.e_loker = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"Loker", readOnly:true});		
		this.e_sebab = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Penyebab", readOnly:true});
		this.e_objek = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"Objek", readOnly:true});		
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,450,20],caption:"Contact Person", readOnly:true});
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,19,450,20],caption:"No Telpon", readOnly:true});				
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,20,450,80],caption:"Keterangan",tag:9});
		
		this.l_label = new portalui_label(this.pc1.childPage[1],{bound:[20,21,100,18],caption:"Data", underline:true});
		this.sgUpld = new saiGrid(this.pc1.childPage[1],{bound:[121,21,848,230],colCount:6,
				      colTitle:["Kode Vendor","Nama Vendor","No Dokumen","Tgl Dokumen","Dokumen","Upload"],
					  columnReadOnly:[true,[0,1,5],[2,3,4]],
					  colFormat:[[5],[cfUpload]],
					  colWidth:[[5,4,3,2,1,0],[80,250,100,150,150,80]], buttonStyle:[[0,3],[bsEllips,bsDate]], 
					  ellipsClick:[this,"doEllipsClick"],change:[this,"doGridChange"], rowCount:1});
		this.sgUpld.setUploadParam([5],"uploadTo", "server/media/", "object","server/media/");	
		this.sgnUpld = new sgNavigator(this.pc1.childPage[1],{bound:[121,this.pc1.height - 25,850,25],buttonStyle:1, grid:this.sgUpld});
		
		this.sgUpld2 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:7,tag:9,
				      colTitle:["Kode Vendor","Nama Vendor","Jenis Dok","No Dokumen","Tanggal","Keterangan","Dokumen"],
					  readOnly:true, colWidth:[[6,5,4,3,2,1,0],[200,250,80,120,60,150,80]],
					  autoAppend:false,defaultRow:1});		
		this.sgnUpld2 = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sgUpld2});
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,11,200,20],caption:"No Klaim",tag:9});
		this.e_nominal = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,12,200,20],caption:"Nilai", tipeText:ttNilai, text:"0",tag:9});		
		this.c_status2 = new saiCB(this.pc1.childPage[3],{bound:[20,10,200,20],caption:"Status Approval",items:["-","SURVEY","TESTED","SPPH"], readOnly:true,tag:9});
		this.bCari = new button(this.pc1.childPage[3],{bound:[230,10,80,18],caption:"Tampil Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select now() as tgl ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.dp_d1.setText(line.tgl);
			}
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_eclaim3_transaksi_fProgress.extend(window.childForm);
window.app_eclaim3_transaksi_fProgress.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_progress','no_progress',"PRG/BDG/"+this.e_periode.getText().substring(2)+".",'000'));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.progress == "3") { var prog = "6"; var status = "SPPH";}
					if (this.progress == "5") { var prog = "6"; var status = "SPPH";}
					if (this.progress == "6") { var prog = "7"; var status = "SPH";}
					
					sql.add("update tlk_klaim set progress='"+prog+"' where no_klaim='"+this.e_noklaim.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update tlk_progress set no_seb='"+this.e_nb.getText()+"' where no_klaim='"+this.e_noklaim.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_seb='-'");
					sql.add("insert into tlk_progress (no_progress,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,host,ip,no_klaim,catatan,no_seb) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'"+status+"','PROGRESS','"+this.app._hostname+"','"+this.app._iphost+"','"+this.e_noklaim.getText()+"','"+this.e_memo.getText()+"','-')");
										
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into tlk_progress_dok (no_progress,no_file,nu,kode_lokasi,kode_vendor,no_dokumen,tgl_dok) values "+
							       "('"+this.e_nb.getText()+"','"+this.sgUpld.cells(5,i).filedest+"','"+ix+"','"+this.app._lokasi+"','"+this.sgUpld.cells(0,i)+"','"+this.sgUpld.cells(2,i)+"','"+this.sgUpld.getCellDateValue(3,i)+"')");
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
					this.sg.clear(1); this.sgUpld.clear(1);	this.sgUpld2.clear(1);				 				
					this.doLoad();
					this.e_memo.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}		
		this.doLoad();
	},				
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {											
				this.pc1.setActivePage(this.pc1.childPage[1]);										
				this.e_noklaim.setText(this.sg.cells(0,row));						
				this.e_tglklaim.setText(this.sg.cells(1,row));		
				this.e_nopolis.setText(this.sg.cells(3,row));		
				this.e_nodok.setText(this.sg.cells(4,row));		
				this.e_nilai.setText(this.sg.cells(2,row));		
				this.e_tgldok.setText(this.sg.cells(5,row));		
				this.e_lokasi.setText(this.sg.cells(6,row));		
				this.e_loker.setText(this.sg.cells(7,row));		
				this.e_sebab.setText(this.sg.cells(8,row));		
				this.e_objek.setText(this.sg.cells(9,row));		
				this.e_pic.setText(this.sg.cells(10,row));		
				this.e_tel.setText(this.sg.cells(11,row));		
				this.e_memo.setText("-");								
				
				if (this.sg.cells(12,row)=="SURVEY") { this.l_label.setCaption("Data SPPH"); this.progress = "3"; }
				if (this.sg.cells(12,row)=="TESTED") { this.l_label.setCaption("Data SPPH"); this.progress = "5"; }
				if (this.sg.cells(12,row)=="SPPH") { this.l_label.setCaption("Data SPH"); this.progress = "6"; }
				
				var data = this.dbLib.getDataProvider("select a.kode_vendor,b.nama,c.status,a.no_dokumen,date_format(a.tgl_dok,'%d/%m/%Y') as tgl_dok,c.catatan,a.no_file "+ 
						   "from tlk_progress_dok a inner join tlk_progress c on a.no_progress=c.no_progress and a.kode_lokasi=c.kode_lokasi "+ 
						   "					    inner join tlk_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
						   "where c.no_klaim='"+this.e_noklaim.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' order by c.status",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgUpld2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgUpld2.appendData([line.kode_vendor,line.nama,line.status,line.no_dokumen,line.tgl_dok,line.catatan,line.no_file]);
					}
				} else this.sgUpld2.clear(1);				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){			
		var strSQL = "select a.no_klaim,date_format(a.tanggal,'%d/%m/%Y') as tanggal,case progress when '3' then 'SURVEY' end as status "+
					 ",a.nilai,a.no_polis,a.no_dokumen,date_format(a.tgl_dokumen,'%d/%m/%Y') as tgl_dokumen,a.alamat,b.nama as loker,c.nama as sebab,d.nama as objek, e.nama as pic, a.no_tel "+ 
		             "from tlk_klaim a "+
		             "inner join tlk_lokasi b on a.kode_lok=b.kode_lok and a.kode_lokasi=b.kode_lokasi and b.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_obyek c on a.kode_obyek=c.kode_obyek and a.kode_lokasi=c.kode_lokasi and c.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_sebab d on a.kode_sebab=d.kode_sebab and a.kode_lokasi=d.kode_lokasi and d.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_hakakses e on a.nik_buat=e.nik and a.kode_lokasi=e.kode_lokasi and e.kode_ttg='"+this.app._kodeTtg+"' "+
					 "inner join tlk_survey f on a.no_klaim=f.no_klaim and f.status='FINAL' and f.jenis='LIABLE NOTEST' "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('3') and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+ 
					 "union all "+					 
					 "select a.no_klaim,date_format(a.tanggal,'%d/%m/%Y') as tanggal,case progress when '5' then 'TESTED' end as status "+
					 ",a.nilai,a.no_polis,a.no_dokumen,date_format(a.tgl_dokumen,'%d/%m/%Y') as tgl_dokumen,a.alamat,b.nama as loker,c.nama as sebab,d.nama as objek, e.nama as pic, a.no_tel "+ 
		             "from tlk_klaim a "+
		             "inner join tlk_lokasi b on a.kode_lok=b.kode_lok and a.kode_lokasi=b.kode_lokasi and b.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_obyek c on a.kode_obyek=c.kode_obyek and a.kode_lokasi=c.kode_lokasi and c.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_sebab d on a.kode_sebab=d.kode_sebab and a.kode_lokasi=d.kode_lokasi and d.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_hakakses e on a.nik_buat=e.nik and a.kode_lokasi=e.kode_lokasi and e.kode_ttg='"+this.app._kodeTtg+"' "+
					 "inner join tlk_testing f on a.no_klaim=f.no_klaim and f.status='FINAL' "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('5') and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "; 					 
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},
	doCari:function(sender){						
		var filter1 = filter2 = "";
		if (this.c_status2.getText()=="-") {
			if (this.e_nobukti.getText()!="") {
				filter1 = " where a.progress='3' and a.no_klaim='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' ";
				filter2 = " where a.progress in ('5','6') and a.no_klaim='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' ";
			}
			if (nilaiToFloat(this.e_nominal.getText())!=0) {
				filter1 = " where a.progress = '3' and a.nilai="+nilaiToFloat(this.e_nominal.getText())+" and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' ";
				filter2 = " where a.progress in ('5','6') and a.nilai="+nilaiToFloat(this.e_nominal.getText())+" and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' ";
			}
		}
		else {
			if (this.c_status2.getText()=="SURVEY") {
				filter1 = " where a.progress = '3' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "; 
				filter2 = " where a.progress = '3' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "; 
			}
			if (this.c_status2.getText()=="TESTED") {
				filter1 = " where a.progress = '5' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' ";			
				filter2 = " where a.progress = '5' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' ";			
			}
			if (this.c_status2.getText()=="SPPH") {
				filter1 = " where a.progress = '6' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' ";			
				filter2 = " where a.progress = '6' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' ";			
			}
		}		
		var strSQL = "select a.no_klaim,date_format(a.tanggal,'%d/%m/%Y') as tanggal,case progress when '3' then 'SURVEY' when '6' then 'SPPH' end as status "+
					 ",a.nilai,a.no_polis,a.no_dokumen,date_format(a.tgl_dokumen,'%d/%m/%Y') as tgl_dokumen,a.alamat,b.nama as loker,c.nama as sebab,d.nama as objek, e.nama as pic, a.no_tel "+ 
					 "from tlk_klaim a "+
					 "inner join tlk_lokasi b on a.kode_lok=b.kode_lok and a.kode_lokasi=b.kode_lokasi and b.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_obyek c on a.kode_obyek=c.kode_obyek and a.kode_lokasi=c.kode_lokasi and c.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_sebab d on a.kode_sebab=d.kode_sebab and a.kode_lokasi=d.kode_lokasi and d.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_hakakses e on a.nik_buat=e.nik and a.kode_lokasi=e.kode_lokasi and e.kode_ttg='"+this.app._kodeTtg+"' "+
					 "inner join tlk_survey f on a.no_klaim=f.no_klaim and f.status='FINAL' and f.jenis='LIABLE NOTEST' "+filter1 +
					 "union all "+					 
					 "select a.no_klaim,date_format(a.tanggal,'%d/%m/%Y') as tanggal,case progress when '5' then 'TESTED' when '6' then 'SPPH' end as status "+
					 ",a.nilai,a.no_polis,a.no_dokumen,date_format(a.tgl_dokumen,'%d/%m/%Y') as tgl_dokumen,a.alamat,b.nama as loker,c.nama as sebab,d.nama as objek, e.nama as pic, a.no_tel "+ 
					 "from tlk_klaim a "+
					 "inner join tlk_lokasi b on a.kode_lok=b.kode_lok and a.kode_lokasi=b.kode_lokasi and b.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_obyek c on a.kode_obyek=c.kode_obyek and a.kode_lokasi=c.kode_lokasi and c.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_sebab d on a.kode_sebab=d.kode_sebab and a.kode_lokasi=d.kode_lokasi and d.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_hakakses e on a.nik_buat=e.nik and a.kode_lokasi=e.kode_lokasi and e.kode_ttg='"+this.app._kodeTtg+"' "+
					 "inner join tlk_testing f on a.no_klaim=f.no_klaim and f.status='FINAL' "+ filter2; 						
	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);				
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.no_klaim,line.tanggal,floatToNilai(line.nilai),line.no_polis,line.no_dokumen,line.tgl_dokumen,line.alamat,line.loker,line.sebab,line.objek,line.pic,line.no_tel,line.status.toUpperCase()]);  
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
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
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Vendor",sender,undefined, 
					"select kode_vendor, nama from tlk_vendor where kode_lokasi = '"+this.app._lokasi+"'", 
					"select count(kode_vendor) from tlk_vendor where kode_lokasi = '"+this.app._lokasi+"'",
					["kode_vendor","nama"],"and",["Kode","Nama"],false);				
				}					
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{
        	if (sender == this.sgUpld && col == 5){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(5).param2 + data.tmpfile;
                this.sgUpld.cells(4,row, data.filedest);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});