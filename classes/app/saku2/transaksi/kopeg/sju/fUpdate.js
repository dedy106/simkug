window.app_saku2_transaksi_kopeg_sju_fUpdate = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fUpdate.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fUpdate";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Update Status Klaim: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,500], childPage:["Data Klaim","Detail Klaim","Filter Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:13,tag:0,
		            colTitle:["No Klaim","Tgl Klaim","Nilai Klaim","No Polis","Keterangan","Penanggung","Tertanggung","Tipe","Status","No Berkas","DOL","Lokasi","Penyebab"],
					colWidth:[[12,11,10,9, 8,7,6,5,4,3,2,1,0],[200,200,70,100, 80,200,200,200,200,150,100,70,100]],
					readOnly:true,colFormat:[[2],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Verifikasi",maxLength:30,readOnly:true,visible:false});		
		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,202,20],caption:"Status Progress",items:["ACTIVE","SETTLED","NOCLAIM"], readOnly:true,tag:2});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_tipe = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Tipe", readOnly:true});
		this.e_noklaim = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"No Klaim", readOnly:true});
		this.e_tglklaim = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Tanggal Klaim", readOnly:true});				
		this.e_nopolis = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"No Polis", readOnly:true});		
		this.e_tgldol = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,450,20],caption:"Date Of Loss", readOnly:true});				
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Nilai Awal", tipeText:ttNilai, text:"0"});		
		this.e_nego = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,200,20],caption:"Nilai Adjusment",  tipeText:ttNilai, text:"0"});		
		this.e_deduc = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai Deductable",  tipeText:ttNilai, text:"0"});		
		this.e_final = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,200,20],caption:"Nilai Settled",  tipeText:ttNilai, text:"0"});				
		this.e_berkas = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"No Berkas", readOnly:true});
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Lokasi", readOnly:true});
		this.e_sebab = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Penyebab Kerugian", readOnly:true});				
		this.e_png = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Penanggung", readOnly:true});		
		this.e_ttg = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,450,20],caption:"Tertanggung", readOnly:true});
		this.e_memo2 = new saiMemo(this.pc1.childPage[1],{bound:[20,20,450,80],caption:"Uraian Klaim",tag:9});
		this.e_memo2.setReadOnly(true);
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[520,20,450,80],caption:"Keterangan",tag:9});
		
		this.sgUpld = new saiGrid(this.pc1.childPage[1],{bound:[1,21,468,140],colCount:2,colTitle:["Dokumen","Upload"],colFormat:[[1],[cfUpload]],
					  colWidth:[[1,0],[80,350]], readOnly:true, change:[this,"doGridChange"], rowCount:1,tag:9});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/", "object","server/media/");	
		this.sgnUpld = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height - 25,470,25],buttonStyle:1, grid:this.sgUpld});
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,260,20],caption:"No Klaim",tag:9});
		this.e_nopolis2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,260,20],caption:"No Dok Polis",tag:9});
		this.c_status2 = new saiCB(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Status Approval",items:["ACTIVE"], readOnly:true,tag:9});
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
			var data = this.dbLib.getDataProvider("select convert(varchar,now(),103) as tgl ",true);
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
window.app_saku2_transaksi_kopeg_sju_fUpdate.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fUpdate.implement({
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
					sql.add("update sju_klaim set progress='"+this.c_status.getText()+"' where no_klaim='"+this.e_noklaim.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update a set no_verseb ='"+this.e_nb.getText()+"' "+
					        "from sju_ver_m a inner join sju_ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi and a.no_verseb='-' "+
							"where b.no_bukti ='"+this.e_noklaim.getText()+"' and b.modul='KLAIM' and b.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into sju_ver_m (no_ver,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_verseb,no_dokumen,nilai_awal,nilai_deduc,nilai_nego,nilai_final) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'"+this.c_status.getText()+"','KLAIM','-','"+this.e_dok.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_deduc.getText())+","+nilaiToFloat(this.e_nego.getText())+","+nilaiToFloat(this.e_final.getText())+")");
					sql.add("insert into sju_ver_d (no_ver,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','"+this.c_status.getText()+"','KLAIM','"+this.e_noklaim.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");
										
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into sju_ver_dok (no_ver,no_file,nu,kode_lokasi) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(1,i).tmpfile+"','"+ix+"','"+this.app._lokasi+"')");
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
					this.sg.clear(1); this.sgUpld.clear(1);					
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
				this.pc1.setActivePage(this.pc1.childPage[1]);										
				this.e_noklaim.setText(this.sg.cells(0,row));						
				this.e_tglklaim.setText(this.sg.cells(1,row));		
				this.e_nopolis.setText(this.sg.cells(3,row));		
				this.e_tipe.setText(this.sg.cells(7,row));		
				this.e_nilai.setText(this.sg.cells(2,row));		
				this.e_berkas.setText(this.sg.cells(9,row));		
				this.e_tgldol.setText(this.sg.cells(10,row));		
				this.e_lokasi.setText(this.sg.cells(11,row));		
				this.e_sebab.setText(this.sg.cells(12,row));						
				this.e_png.setText(this.sg.cells(5,row));		
				this.e_ttg.setText(this.sg.cells(6,row));		
				this.e_memo2.setText(this.sg.cells(4,row));								
				
				var strSQL = "select a.nilai_deduc from sju_polis_m a where a.no_polis='"+this.e_nopolis.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_deduc.setText(floatToNilai(line.nilai_deduc));				
					}
				}				
				var strSQL = "select  top 1 nilai_awal,nilai_deduc,nilai_nego,nilai_final from sju_ver_m a inner join sju_ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
				             "where a.modul='KLAIM' and a.no_verseb='-' and b.no_bukti='"+this.e_noklaim.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' order by a.no_ver desc";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_nilai.setText(floatToNilai(line.nilai_awal))
						this.e_deduc.setText(floatToNilai(line.nilai_deduc));
						this.e_nego.setText(floatToNilai(line.nilai_nego));
						this.e_final.setText(floatToNilai(line.nilai_final));
					}
				}				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){			
		var strSQL = "select no_klaim,convert(varchar,a.tanggal,103) as tanggal,a.nilai,a.no_polis,a.progress,a.keterangan,c.kode_cust +'-'+c.nama as cust, d.kode_vendor +'-'+d.nama as vendor,e.kode_tipe+'-'+e.nama as tipe,a.lokasi,a.sebab+' - '+f.nama as sebab,a.no_berkas,convert(varchar,a.tgl_dol,103) as tgl_dol "+
		             "from sju_klaim a inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
					 "                   inner join sju_cust c on b.kode_cust = c.kode_cust and b.kode_lokasi=c.kode_lokasi "+
					 "                   inner join sju_polis_vendor bb on b.no_polis = bb.no_polis and b.kode_lokasi=bb.kode_lokasi and bb.status='LEADER' "+
					 "                   inner join sju_vendor d on bb.kode_vendor = d.kode_vendor and bb.kode_lokasi=d.kode_lokasi "+
					 "                   inner join sju_tipe e on b.kode_tipe = e.kode_tipe and b.kode_lokasi=e.kode_lokasi "+
					 "                   inner join sju_sebab f on a.sebab=f.kode_sebab and a.kode_lokasi=f.kode_lokasi "+
		             "where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('KLAIM','ACTIVE') and a.kode_lokasi='"+this.app._lokasi+"' ";
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
		if (this.e_nobukti.getText()!="") var filter = " and a.no_klaim='"+this.e_nobukti.getText()+"' ";
		if (this.e_nopolis2.getText()!="") var filter = " and x.no_dok='"+this.e_nopolis2.getText()+"' ";
		var strSQL = "select no_klaim,convert(varchar,a.tanggal,103) as tanggal,a.nilai,a.no_polis,a.progress,a.keterangan,c.kode_cust +'-'+c.nama as cust, d.kode_vendor +'-'+d.nama as vendor,e.kode_tipe+'-'+e.nama as tipe,a.lokasi,a.sebab+' - '+f.nama as sebab,a.no_berkas,convert(varchar,a.tgl_dol,103) as tgl_dol "+					 					 					 
		             "from sju_klaim a inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
					 "                   inner join sju_cust c on b.kode_cust = c.kode_cust and b.kode_lokasi=c.kode_lokasi "+
					 "                   inner join sju_polis_vendor bb on b.no_polis = bb.no_polis and b.kode_lokasi=bb.kode_lokasi and bb.status='LEADER' "+
					 "                   inner join sju_vendor d on bb.kode_vendor = d.kode_vendor and bb.kode_lokasi=d.kode_lokasi "+
					 "                   inner join sju_tipe e on b.kode_tipe = e.kode_tipe and b.kode_lokasi=e.kode_lokasi "+
					 "                   inner join sju_sebab f on a.sebab=f.kode_sebab and a.kode_lokasi=f.kode_lokasi "+
					 "                   inner join sju_polis_m x on b.no_polis=x.no_polis and b.kode_lokasi=x.kode_lokasi "+
		             "where a.progress in ('KLAIM','ACTIVE') and a.kode_lokasi='"+this.app._lokasi+"' "+filter;
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
			this.sg.appendData([line.no_klaim,line.tanggal,floatToNilai(line.nilai),line.no_polis,line.keterangan,line.vendor,line.cust,line.tipe,line.progress,line.no_berkas,line.tgl_dol,line.lokasi,line.sebab]);  
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
	doGridChange: function(sender, col, row,param1,result, data){
	    try{
        	if (sender == this.sgUpld && col == 1){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + data.tmpfile;
                this.sgUpld.cells(0,row, data.tmpfile);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});