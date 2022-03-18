window.app_eclaim3_transaksi_fVer = function(owner)
{
	if (owner)
	{
		window.app_eclaim3_transaksi_fVer.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim3_transaksi_fVer";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Lap Awal: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,500], childPage:["Data Lap Awal","Detail Lap Awal","Filter Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:13,tag:0,
		            colTitle:["No Klaim","Tgl Klaim","N Estimasi","No Polis","No Dokumen","Tgl Dok","Lokasi Kejadian","Loker","Penyebab","Object","PIC","No Telp","Status"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,150,200,200,150,200,70,100,150,100,70,100]],
					readOnly:true,colFormat:[[2],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Verifikasi",maxLength:30,readOnly:true,visible:false});		
		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,202,20],caption:"Status Approval",items:["APPROVE","REVISI"], readOnly:true,tag:2});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tgl SJU", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,12,100,18],caption:"Tgl Jasindo", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,12,100,18]}); 		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
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
		
		this.sgUpld = new saiGrid(this.pc1.childPage[1],{bound:[1,21,468,140],colCount:2,colTitle:["Dokumen","Upload"],colFormat:[[1],[cfUpload]],
					  colWidth:[[1,0],[80,350]], readOnly:true, change:[this,"doGridChange"], rowCount:1,tag:9});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/", "object","server/media/");	
		this.sgnUpld = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height - 25,470,25],buttonStyle:1, grid:this.sgUpld});
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"No Klaim",tag:9});
		this.e_nominal = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"Nilai", tipeText:ttNilai, text:"0",tag:9});		
		this.c_status2 = new saiCB(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Status Approval",items:["-","LAPAWAL","REVISI"], readOnly:true,tag:9});
		this.bCari = new button(this.pc1.childPage[2],{bound:[230,10,80,18],caption:"Tampil Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
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
window.app_eclaim3_transaksi_fVer.extend(window.childForm);
window.app_eclaim3_transaksi_fVer.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_ver_m','no_ver',"VER/BDG/"+this.e_periode.getText().substring(2)+".",'000'));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.c_status.getText()=="APPROVE")  var prog = "1";
					if (this.c_status.getText()=="REVISI")  var prog = "R";
					sql.add("update tlk_klaim set nilai="+nilaiToFloat(this.e_nilai.getText())+",progress='"+prog+"',no_ver='"+this.e_nb.getText()+"' where no_klaim='"+this.e_noklaim.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update tlk_ver_m a "+
					        "inner join tlk_ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi and a.no_verseb='-' "+
							"set no_verseb ='"+this.e_nb.getText()+"' "+
							"where b.no_bukti ='"+this.e_noklaim.getText()+"' and b.modul='LAPAWAL' and b.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into tlk_ver_m (no_ver,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_verseb,tgl_png,host,ip,no_dokumen) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'"+this.c_status.getText()+"','LAPAWAL','-','"+this.dp_d2.getDateString()+"','"+this.app._hostname+"','"+this.app._iphost+"','"+this.e_dok.getText()+"')");
					sql.add("insert into tlk_ver_d (no_ver,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','"+prog+"','LAPAWAL','"+this.e_noklaim.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");
										
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into tlk_ver_dok (no_ver,no_file,nu,kode_lokasi) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(1,i).filedest+"','"+ix+"','"+this.app._lokasi+"')");
						}	
					}
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
					this.doMail(this.e_nb.getText());
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
					this.sg.clear(1); this.sgUpld.clear(1);					
					this.doLoad();
					this.e_memo.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.c_status.setText("APPROVE");
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
				
				if (this.sg.cells(10,row) == "REVISI") this.e_nilai.setReadOnly(false); else this.e_nilai.setReadOnly(true);								
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){			
		var strSQL = "select no_klaim,date_format(a.tanggal,'%d/%m/%Y') as tanggal,case progress when '0' then 'LAPAWAL' when 'R' then 'REVISI' end as status "+
					 ",a.nilai,a.no_polis,a.no_dokumen,date_format(a.tgl_dokumen,'%d/%m/%Y') as tgl_dokumen,a.alamat,b.nama as loker,c.nama as sebab,d.nama as objek, e.nama as pic, a.no_tel "+ 
		             "from tlk_klaim a "+
		             "inner join tlk_lokasi b on a.kode_lok=b.kode_lok and a.kode_lokasi=b.kode_lokasi and b.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_obyek c on a.kode_obyek=c.kode_obyek and a.kode_lokasi=c.kode_lokasi and c.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_sebab d on a.kode_sebab=d.kode_sebab and a.kode_lokasi=d.kode_lokasi and d.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_hakakses e on a.nik_buat=e.nik and a.kode_lokasi=e.kode_lokasi and e.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('0','R') and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' ";
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},
	doCari:function(sender){				
		var filter = "";
		if (this.c_status2.getText()=="-") {
			if (this.e_nobukti.getText()!="") filter = " where a.progress in ('0','R') and a.no_klaim='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"'";
			if (nilaiToFloat(this.e_nominal.getText())!=0) filter = " where a.progress in ('0','R') and a.nilai="+nilaiToFloat(this.e_nominal.getText())+" and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"'";		
		}
		else {
			if (this.c_status2.getText()=="LAPAWAL") filter = " where a.progress = '0' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"'";
			else filter = " where a.progress = 'R' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"'";
		}
		var strSQL = "select no_klaim,date_format(a.tanggal,'%d/%m/%Y') as tanggal,case progress when '0' then 'LAPAWAL' when 'R' then 'REVISI' end as status "+
					 ",a.nilai,a.no_polis,a.no_dokumen,a.tgl_dokumen,a.alamat,b.nama as loker,c.nama as sebab,d.nama as objek, e.nama as pic, a.no_tel "+ 
		             "from tlk_klaim a "+
		             "inner join tlk_lokasi b on a.kode_lok=b.kode_lok and a.kode_lokasi=b.kode_lokasi and b.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_obyek c on a.kode_obyek=c.kode_obyek and a.kode_lokasi=c.kode_lokasi and c.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_sebab d on a.kode_sebab=d.kode_sebab and a.kode_lokasi=d.kode_lokasi and d.kode_ttg='"+this.app._kodeTtg+"' "+					 
					 "inner join tlk_hakakses e on a.nik_buat=e.nik and a.kode_lokasi=e.kode_lokasi and e.kode_ttg='"+this.app._kodeTtg+"' "+filter;					
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
	doMail: function(no_ver){
		try{
			this.nama_report="server_report_eclaim3_rptVerifikasiMail";
			this.filter = " where h.no_ver='"+no_ver+"' ";
			this.filter2 = this.app._email+"/"+this.app._emailadm+"/"+this.app._emailttg+"/"+this.app._userStatus+"/"+this.app._fromadm;
			this.viewer.prepare();
			this.viewer.setVisible(true);
			this.app._mainForm.pButton.setVisible(false);
			this.app._mainForm.reportNavigator.setVisible(true);
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			this.showFilter = "";
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
			this.page = 1;
			this.allBtn = false;
			
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
	doGridChange: function(sender, col, row,param1,result, data){
	    try{
        	if (sender == this.sgUpld && col == 1){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + data.tmpfile;
                this.sgUpld.cells(0,row, data.filedest);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});