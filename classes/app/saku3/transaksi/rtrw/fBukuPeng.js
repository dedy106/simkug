window.app_saku3_transaksi_rtrw_fBukuPeng = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rtrw_fBukuPeng.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rtrw_fBukuPeng";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Konten", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,440], childPage:["Daftar Buku Penghubung","Data Buku Penghubung","Filter Cari"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:3,tag:9,
		            colTitle:["No Bukti","Tanggal","Jenis"],
					colWidth:[[2,1,0],[350,80,100]],
					colHide:[[3],[true]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
        
        this.e_periode = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});	
        this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
        this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true,change:[this,"doChange"]});
        this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});			
        this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,20,200,20],caption:"Jenis BC",items:["UMUM","RW","RT","No Rumah"], readOnly:true,tag:2,change:[this,"doChange"]});
        
        this.cb_rw = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,21,220,20],caption:"RW",multiSelection:false,tag:2});			
		this.cb_rt = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,21,220,20],caption:"RT",multiSelection:false,tag:2});	
		this.cb_no_rumah = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,21,220,20],caption:"No Rumah",multiSelection:false,tag:1,change:[this,"doChange"]});	
					
		this.e_foto = new saiLabelEdit(this.pc1.childPage[1], {bound:[20,15,300,20], caption:"Gambar"});
		this.u_foto = new uploader(this.pc1.childPage[1], {bound:[320,15,80,20],param3: "object", param4 :"server/media/",param2 :"server/tmp/", param1 : "uploadTo",
				autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Browse"} )
        this.e_dok = new saiLabelEdit(this.pc1.childPage[1], {bound:[20,16,300,20], caption:"Dokumen"});
        this.u_dok = new uploader(this.pc1.childPage[1], {bound:[320,16,80,20],param3: "object", param4 :"server/media/",param2 :"server/tmp/", param1 : "uploadTo",
                        autoSubmit:true, afterUpload: [this, "doUploadFinish2"], caption:"Browse"} )
        
		
		this.e_nb2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"No Bukti",maxLength:10,tag:9});				
        this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});	
        
        this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[5,20,990,258], childPage:["Pesan "]});		
        this.mDesk1 = new tinymceCtrl(this.pc2.childPage[0],{bound:[5,5,985,158], withForm:false});	
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		this.iFoto = new image(this.pc1.childPage[1], {bound:[620, this.dp_d1.top, 200,100]});
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
            this.rootDir = this.app._rootDir;
			
            this.standarLib = new util_standar();
            this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
            this.stsSimpan = 1;
            this.doLoad();
            
			this.cb_rw.setVisible(false);
			this.cb_rt.setVisible(false);
            this.cb_no_rumah.setVisible(false);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rtrw_fBukuPeng.extend(window.childForm);
window.app_saku3_transaksi_rtrw_fBukuPeng.implement({
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
                    
                    if (this.stsSimpan == 0){
                        sql.add("delete from rt_buku_p where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ");
                    }

					sql.add("insert into rt_buku_p (no_bukti,kode_lokasi,kode_pp,jenis,rw,rt,no_rumah,keterangan,tanggal,file_gambar,file_dok,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.c_jenis.getText()+"','"+this.cb_rw.getText()+"','"+this.cb_rt.getText()+"','"+this.cb_no_rumah.getText()+"','"+urlencode(this.mDesk1.getCode())+"','"+this.dp_d1.getDateString()+"','"+this.e_foto.getText()+"','"+this.e_dok.getText()+"','"+this.app._userLog+"',getdate())");					
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
					sql.add("delete from rt_buku_p where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ");
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
					this.doLoad();
				setTipeButton(tbAllFalse);
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
		this.e_periode.setText(y+""+m)
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0) {
				// this.sg.clear(1);
				// this.sg.validasi();
				
			} 			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rt_buku_p","no_bukti",this.app._lokasi+"-BPRT.","0000"));
			this.stsSimpan = 1;
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.e_nb && this.e_nb.getText() != ""){
				var strSQL = "select * "+
				             "from rt_buku_p "+
						     "where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
                        this.c_jenis.setText(line.jenis);
                        // this.cb_matpel.setText(line.kode_matpel);
                        // this.e_keterangan.setText(line.keterangan);
                        this.cb_rw.setText(line.rw);
                        this.cb_rt.setText(line.rt);
                        this.cb_no_rumah.setText(line.no_rumah);
						this.mDesk1.setCode(urldecode(line.keterangan));
						this.e_foto.setText(trim(line.file_gambar));
                        this.iFoto.setImage("server/media/"+trim(line.file_gambar));
                        this.fileBfr = line.file_gambar;

                        this.e_dok.setText(trim(line.file_dok));
                        this.fileBfr2 = line.file_dok;	
						
                        setTipeButton(tbUbahHapus);
                        this.stsSimpan = 0;		
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
                        setTipeButton(tbSimpan);
                        this.stsSimpan = 1;		
					}
				}
            }
            if(sender == this.c_jenis && this.c_jenis.getText() != ""){
				if(this.c_jenis.getText()=="UMUM"){
					this.cb_rw.setVisible(false);
					this.cb_rw.setTag("9");
					this.cb_rw.setText("");

					this.cb_rt.setVisible(false);
					this.cb_rt.setTag("9");
					this.cb_rt.setText("");

					this.cb_no_rumah.setVisible(false);
					this.cb_no_rumah.setTag("9");
					this.cb_no_rumah.setText("");
				}
				if(this.c_jenis.getText()=="RW"){
					this.cb_rw.setVisible(true);
					this.cb_rw.setTag("9");
					this.cb_rw.setText("");

					this.cb_rt.setVisible(false);
					this.cb_rt.setTag("9");
					this.cb_rt.setText("");

					this.cb_no_rumah.setVisible(false);
					this.cb_no_rumah.setTag("9");
					this.cb_no_rumah.setText("");

					this.cb_rw.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ",["kode_lokasi","nama"],false,["Kode RW","Nama"],"and","Data RW",true);			
					this.cb_rw.setText("-");
				}

				if(this.c_jenis.getText()=="RT"){
					this.cb_rw.setVisible(false);
					this.cb_rw.setTag("9");
					this.cb_rw.setText("");

					this.cb_rt.setVisible(true);
					this.cb_rt.setTag("9");
					this.cb_rt.setText("");

					this.cb_no_rumah.setVisible(false);
					this.cb_no_rumah.setTag("9");
					this.cb_no_rumah.setText("");

					this.cb_rt.setSQL("select kode_pp, nama from pp where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ",["kode_pp","nama"],false,["Kode PP","Nama"],"and","Data PP",true);			
					this.cb_rt.setText("-");
				}

				if(this.c_jenis.getText()=="No Rumah"){
					this.cb_rw.setVisible(false);
					this.cb_rw.setTag("9");
					this.cb_rw.setText("");

					this.cb_rt.setVisible(false);
					this.cb_rt.setTag("9");
					this.cb_rt.setText("");

					this.cb_no_rumah.setVisible(true);
					this.cb_no_rumah.setTag("9");
					this.cb_no_rumah.setText("");

					this.cb_no_rumah.setSQL("select kode_rumah, keterangan from rt_rumah where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ",["kode_rumah","keterangan"],false,["No Rumah","Keterangan"],"and","Data Rumah",true);					
					this.cb_no_rumah.setText("-");
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
						if (result.toLowerCase().search("error") == -1)					
						{
                            // try{
                           
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_foto.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
									if (this.fileBfr2 != this.e_dok.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr2);
								}
								this.fileUtil.copyFileTo(this.rootDir+"/server/tmp/"+this.fileDest.tmpfile, this.rootDir+ "/server/media/"+this.fileDest.filedest, false);
								this.fileUtil.copyFileTo(this.rootDir+"/server/tmp/"+this.fileDest2.tmpfile, this.rootDir+ "/server/media/"+this.fileDest2.filedest, false);


                            this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
                            this.app._mainForm.bClear.click();
                            
                            // } catch(e) {alert(e);}

							
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);										
                this.e_nb.setText(this.sg1.cells(0,row));	
                			
			}
		} catch(e) {alert(e);}
	},
	doCari:function(sender){								
		if (this.e_nb2.getText() != "") var filter = " a.no_bukti like '%"+this.e_nb2.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' ";
		
		var strSQL = "select a.*,convert(varchar,a.tanggal,103) as tgl "+
		             "from rt_buku_p a "+
					 "where "+filter+"  order by a.no_bukti";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doLoad:function(sender){						
        var strSQL = "select a.*,convert(varchar,a.tanggal,103) as tgl from rt_buku_p a where a.kode_lokasi='"+this.app._lokasi+"'  order by a.no_bukti ";	
        
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.no_bukti,line.tgl,line.jenis]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doUploadFinish: function(sender, result, data, filename){
		try{	
			
			if (result){			
				this.fileDest = data;
				this.iFoto.setImage(sender.param2+data.tmpfile);	
				this.iFoto.setProportional(true);
				this.e_foto.setText(trim(data.filedest) );
			}else system.alert(this,"Error upload","");
		}catch(e){
			system.alert(this,"Error upload",e);
		}
    },
    doUploadFinish2: function(sender, result, data, filename){
		try{	
			
			if (result){			
				this.fileDest2 = data;
				this.e_dok.setText(trim(data.filedest) );
			}else system.alert(this,"Error upload","");
		}catch(e){
			system.alert(this,"Error upload",e);
		}
	}
});